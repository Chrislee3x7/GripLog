const express = require('express');
const router = express.Router();
const Problem = require('../models/problem');
const Attempt = require('../models/attempt');
const User = require('../models/user');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
// const upload = multer({ dest: 'upload/' });

// Help us store only specific filetypes
const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};

// code for uploading images to backend using multer
var storage = multer.diskStorage({
  destination: function(req, file, cb) { // request, file, and callback
    const isValid = FILE_TYPE_MAP[file.mimetype]; 
    let uploadError = new Error('invalid image type');
    if (isValid) {
      uploadError = null;
    }

    cb(uploadError, 'public/uploads');
  },
  filename: function(req, file, cb) {
    const fileName = file.originalname.split(' ').join('-');
    const extension = FILE_TYPE_MAP[file.mimetype]; // Check the file for its type
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  }
});

var uploadOptions = multer({storage: storage});

// Initial route that a Get request will take.
// Visiting http://localhost:3000 will yield "hello API!"
// http://localhost:3000/api/v1/problems

// gets all Problems of this user does aggregate function to find attempts data
router.get('/', async (req, res) => {
  // check user_Id first
  // get token 'x-access-token' from header
  const token = req.get('Authorization').split(' ')[1];
  // decode jwt
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  // get the user from the userId from the decoded jwt
  const userId = await User.findById(decoded.userId).select('_id');

  // console.log("got userId", userId)
  if (!userId) return res.status(400).send('User is invalid!');

  // const castUserId = (userId) => mongoose.Types.ObjectId(userId);
  const query = { user_id: new mongoose.Types.ObjectId(userId) }
  const problemOverviewList = await Problem.aggregate([{ 
      $match: query
    },
    {
      $lookup: {
        from: "attempts",
        localField: "_id",
        foreignField: "problem_id",
        as: "attempts"
      }
    },
    {
      $unwind: {
        path: "$attempts",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: "$_id",
        grade: { $max: "$grade" },
        color: { $max: "$color" },
        name: { $max: "$name" },
        location: { $max: "$location" },
        attemptCount: { $sum: { $cond: { if: { $gt: ["$attempts", undefined] }, then: 1, else: 0 } } },
        sendCount: { $sum: { $cond: { if: "$attempts.isSend", then: 1, else: 0 } } },
        dateStarted: { $max: "$dateStarted" },
        lastAttemptDate: { $max: "$attempts.date" }
      }
    },
    {
      $project: {
        _id: 1,
        grade: 1,
        color: 1,
        name: 1,
        location: 1,
        attemptCount: 1,
        sendCount: 1,
        dateStarted: 1,
        lastAttemptDate: { $ifNull: [ "$lastAttemptDate", new Date("9000-01-01") ] }
      }
    },
    {
      $sort: {
        lastAttemptDate: -1,
        dateStarted: -1
      }
    }
  ]).exec();
  // console.log(problemOverviewList, "problem agg above");
  // const problemList = await Problem.find(query).select('color grade name location');
  if (!problemOverviewList) {
    return res.status(500).json({success: false});
  }
  res.status(200).send(problemOverviewList);
});

// get problem with _id requested
router.get('/:id', async (req, res) => {
  const problem = await Problem.findById(req.params.id);
  if (!problem) {
    return res.status(500).json({success: false});
  }
  res.status(200).send(problem);
});

// create a new problem
router.post('/', uploadOptions.array('images', 5), async (req, res) => {
  // check user_Id first
  // get token 'x-access-token' from header
  const token = req.get('Authorization').split(' ')[1];
  // decode jwt
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  // get the user from the userId from the decoded jwt
  const userId = await User.findById(decoded.userId).select('_id');
  
  if (!userId) return res.status(400).send('User is invalid!');

  // Make sure there is at least one image
  const files = req.files;
  // if (!files || files.length == 0) {
  //   return res.status(400).send('No images in the request!');
  // }
  // set the imagePath variable to have all image paths of the images uploaded
  let imagePaths = [];
  if (files) {
    files.map(file => {
      const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
      imagePaths.push(`${basePath}${file.filename}`);
    })
  }

  const problem = new Problem({
    user_id: userId,
    name: req.body.name,
    grade: req.body.grade,
    color: req.body.color,
    attemptCount: 0,
    sendCount: 0,
    images: imagePaths,
    location: req.body.location,
    dateCompleted: 0
  });

  console.log("defined problem in server");

  const createdProblem = await problem.save();
  if (!createdProblem) {
    return res.status(400).send('Problem could not be created!');
  }
  res.status(201).json(createdProblem);
});

// delete a problem
router.delete('/', async (req,res) => {
  // check user_Id first
  // get token 'x-access-token' from header
  const token = req.get('Authorization').split(' ')[1];
  // decode jwt
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  // get the user from the userId from the decoded jwt
  const userId = await User.findById(decoded.userId).select('_id');
  if (!userId) return res.status(400).send('User is invalid!');

  // check if problem id is valid
  if (!mongoose.isValidObjectId(req.body.problem_id)) {
    return res.status(400).send('Problem ID is invalid!');
  }

  const problem = await Problem.findByIdAndDelete(req.body.problem_id);
  if (!problem) {
    return res.status(404).json({success: false, message: 'Problem not be found!'}); 
  }
  // also need to delete attempts associated with problem
  await Attempt.deleteMany({ problem_id: req.body.problem_id });

  res.status(200).json({success: true, message: 'Problem was successfully deleted.'})
});

// edit a problem
router.put('/', async (req, res) => {
   // check user_Id first
  // get token 'x-access-token' from header
  const token = req.get('Authorization').split(' ')[1];
  // decode jwt
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  // get the user from the userId from the decoded jwt
  const userId = await User.findById(decoded.userId).select('_id');
  // console.log("got userId", userId)
  if (!userId) return res.status(400).send('User is invalid!');
  
  if (!mongoose.isValidObjectId(req.body.problem_id)) {
    return res.status(400).send('Problem ID is invalid!');
  }

  const problem = await Problem.findByIdAndUpdate(
    req.body.problem_id,
    {
      name: req.body.name,
      grade: req.body.grade,
      color: req.body.color,
      // location: req.body.location, TODO!!!!!
    },
    { new: true } // means that we want the new updated data to be returned
  );

  if (!problem) {
    return res.status(400).send('Problem could not be updated!');
  }
  res.send(problem);
});

// Updating image gallery given a certain problem id
router.put(
  '/:id/image-gallery', 
  uploadOptions.array('images', 5), 
  async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send('Problem ID is invalid!');
    }
    const files = req.files;
    let imagePaths = [];
    if (files) {
      files.map(file => {
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        imagePaths.push(`${basePath}${file.filename}`);
      })
    }

    // TODO potentially get all old imagePaths and add the new image paths to the array
    const problem = await Problem.findByIdAndUpdate(
      req.params.id,
      {
        images: imagePaths
      },
      {new : true}
    )

    if (!problem) {
      return res.status(400).send('Problem could not be updated!');
    }
    res.send(problem);

    
});

// 

module.exports = router;