import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Card, Text, Button, FAB, useTheme } from 'react-native-paper';
import { ScrollView, View, Image } from 'react-native'
import UserService from '../services/user.service';
import ProblemCard from './ProblemCard';
import NewProblemModal from './NewProblemModal';


const ProblemListView = ({ navigation }) => {

  const theme = useTheme();

  const [problems, setProblems] = useState([]);
  const [newProblemModalIsVisible, setNewProblemModalIsVisible] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      fetchProblems();

      return;
    }, [newProblemModalIsVisible])
  );

  const fetchProblems = async () => {
    const problems = await UserService.getProblems();
    // console.log(problems.data);
    setProblems(problems.data);
  }

  const onProblemPress = (id, color, grade, name) => {
    console.log(`Problem ${id} ${color} ${grade} ${name} pressed`);
    navigation.navigate("ProblemDetail", { id: id, color: color, grade: grade, name: name });
  }

  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 mt-12 mx-4" style={{backgroundColor: theme.colors.surface}}>
      <Text className="mt-6 mb-4 mx-4" variant="headlineLarge">Problems</Text>
      <ScrollView showsVerticalScrollIndicator="false">
        <View className="flex-col overflow-auto">
          {problems.length > 0 ? problems.map(problem => (
            <ProblemCard
              id={problem._id}
              grade={problem.grade}
              color={problem.color}
              name={problem.name}
              imageUri="https://wallpapers.com/images/hd/vertical-sunset-shade-mountain-i3d1yb2udkq9rn59.jpg"
              sendCount={problem.sendCount ? problem.sendCount : 0}
              attemptCount={problem.attemptCount ? problem.attemptCount : 0}
              lastAttemptDate={problem.lastAttemptDate ? problem.lastAttemptDate : 0}
              key={problem._id}
              onPress={(id, color, grade, name) => onProblemPress(id, color, grade, name)}
              />
          )):
          <View>
            <Text>Get started by creating a new Problem!</Text>
          </View>
        }
        </View>
      </ScrollView>
      <FAB className="absolute bottom-4 right-4" variant="tertiary" size="medium" icon="plus" onPress={() => setNewProblemModalIsVisible(true)}/>
      <NewProblemModal visible={newProblemModalIsVisible} setVisible={setNewProblemModalIsVisible}/>
    </View>
  )
}

export default ProblemListView;