const express = require('express');
const router = express.Router();
const Problem = require('../models/problem');
const User = require('../models/user');
const multer = require('multer');
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
router.get('/', async (req, res) => {
  // gets all Problems of this user (only color grade and name)
  // check user_Id first
  const user = await User.findById(req.body.user_id);
  console.log(req.body);
  if (!user) return res.status(400).send('User is invalid!');

  const query = { user_id: req.body.user_id }
  const problemList = await Problem.find(query).select('color grade name',);
  if (!problemList) {
    return res.status(500).json({success: false});
  }
  res.status(200).send(problemList);
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
  const user = await User.findById(req.body.user_id);
  if (!user) return res.status(400).send('User is invalid!');

  // Make sure there is at least one image
  const files = req.files;
  if (files.length == 0) {
    return res.status(400).send('No images in the request!');
  }
  // set the imagePath variable to have all image paths of the images uploaded
  let imagePaths = [];
  if (files) {
    files.map(file => {
      const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
      imagePaths.push(`${basePath}${file.filename}`);
    })
  }

  const problem = new Problem({
    user_id: req.body.user_id,
    name: req.body.name,
    grade: req.body.grade,
    color: req.body.color,
    attemptCount: req.body.attemptCount,
    images: imagePaths,
    location: req.body.location,
    dateCompleted: req.body.dateCompleted
  });

  const createdProblem = await problem.save();
  if (!createdProblem) {
    return res.status(400).send('Problem could not be created!');
  }
  res.status(201).json(createdProblem);
});

// delete a problem
router.delete('/:id', async (req,res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send('Problem ID is invalid!');
  }

  const problem = await Problem.findByIdAndDelete(req.params.id);
  if (!problem) {
    return res.status(404).json({success: false, message: 'Problem not be found!'}); 
  }
  res.status(200).json({success: true, message: 'Problem was successfully deleted.'})
});

// edit a problem
router.put('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send('Problem ID is invalid!');
  }

  const problem = await Problem.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      grade: req.body.grade,
      color: req.body.color,
      location: req.body.location,
      dateCompleted: req.body.dateCompleted
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