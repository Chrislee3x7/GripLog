import React, { useState } from 'react';
import { Card, Text, Button, FAB } from 'react-native-paper';
import { ScrollView, View, Image } from 'react-native'
import { useTheme } from 'react-native-paper';
import UserService from '../services/user.service';
import ProblemCard from './ProblemCard';
import NewProblemModal from './NewProblemModal';


const ProblemListView = ({ navigation }) => {

  const titleVariant = "titleMedium";
  const theme = useTheme();

  const [problems, setProblems] = useState([]);

  React.useEffect(() => {
    

    const unsubscribe = navigation.addListener('focus', async (e) => {
      // Do something
      console.log("in listener");
      const problems = await UserService.getProblems();
      console.log(problems.data);
      setProblems(problems.data);
      
    });
  
    return unsubscribe;
  }, [navigation]);

  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 mt-12 mx-4" style={{backgroundColor: theme.colors.surface}}>
      <Text className="mt-6 mb-4 mx-4" variant="headlineLarge">Problems</Text>
      <ScrollView showsVerticalScrollIndicator="false">
        <View className="flex-col overflow-auto">
          {problems.length > 0 ? problems.map(problem => (
            <ProblemCard
              grade={problem.grade}
              color={problem.color}
              name={problem.name}
              imageUri="https://wallpapers.com/images/hd/vertical-sunset-shade-mountain-i3d1yb2udkq9rn59.jpg"
              sendCount={problem.sendCount ? problem.sendCount : 0}
              attemptCount={problem.attemptCount ? problem.attemptCount : 0}
              lastAttemptDate={problem.lastAttemptDate ? problem.lastAttemptDate : 0}
              key={problem._id}
              />
          )):
          <View>
            <Text>Get started by creating a new Problem!</Text>
          </View>
        }
        </View>
      </ScrollView>
    </View>
  )
}

export default ProblemListView;