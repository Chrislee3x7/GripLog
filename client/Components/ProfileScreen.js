import React, { useEffect, useState, useWindowDimensions } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Card, Text, Button, Divider } from 'react-native-paper';
import { Dimensions, ScrollView, View } from 'react-native';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';
import { useFocusEffect } from '@react-navigation/core';
import { BarChart } from 'react-native-gifted-charts'


const ProfileScreen = ({ navigation }) => {
  // const { windowHeight, windowWidth } = useWindowDimensions();
  const windowWidth = Dimensions.get('window').width;

  const [problemCount, setProblemCount] = useState(0);
  const [sentProblemCount, setSentProblemCount] = useState(0);
  const [averageAttemptsToSend, setAverageAttemptsToSend] = useState(0);

  const [completionRateByGradeData, setCompletionRateByGradeData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      return;
    }, [])
  );

  const fetchData = async () => {
    let res = await UserService.getProblems();
    // console.log(problems.data);
    if (!res) {
      console.error('Unable to getProblems');
      return;
    }
    const problems = res.data;
    setProblemCount(problems.filter((problem) => {return problem.attemptCount >= 1}).length);
    setSentProblemCount(problems.filter((problem) => {return problem.sendCount >= 1}).length);
    
    res = await UserService.getProblemStats();
    if (!res) {
      console.error('Unable to getProblems');
      return;
    }
    const averageAttemptsToSend = res.data.average_attempt_count;
    setAverageAttemptsToSend(averageAttemptsToSend);

    res = await UserService.getCompletionRateByGrade();
    if (!res) {
      console.error('Unable to getProblems');
      return;
    }
    const resCompletions = res.data;
    let completions = [];
    resCompletions.map((c) => {
      completions.push({label: ("v" + c.grade), value: (c.completionRate * 100)});
    })
    
    setCompletionRateByGradeData(completions);
  }

  const onLogoutPress = async () => {
    // attempt to logout
    const logoutRes = await AuthService.logout();
    console.log(logoutRes);
    // return to login screen
    navigation.navigate("Login");
  }

  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 mt-12 mx-4">
      <Text className="mt-6 mb-4 mx-4" variant="headlineLarge">Profile</Text>
      <ScrollView>
        <View className="gap-y-2 mx-2 items-center">
          <View className="flex-row">
            <Text className="my-2" variant="titleMedium">Problems Attempted:</Text>
            <View className="grow"/>
            <Text className="my-2" variant="titleMedium">{problemCount}</Text>
          </View>
          <Divider/>
          <View className="flex-row">
            <Text className="my-2" variant="titleMedium">Problems Sent:</Text>
            <View className="grow"/>
            <Text className="my-2" variant="titleMedium">{sentProblemCount}</Text>
          </View>
          <Divider/>
          <View className="flex-row mb-4">
            <Text className="my-2" variant="titleMedium">Average Attempts to Send:</Text>
            <View className="grow"/>
            <Text className="my-2" variant="titleMedium">{averageAttemptsToSend.toFixed(3)}</Text>
          </View>
          {/* The pr-10 is needed to center the bar chart for some reason */}
          <View className=" pr-10">
            <BarChart
              className="self-center"
              barWidth={(windowWidth - (((completionRateByGradeData.length + 4)) * 6)) / (completionRateByGradeData.length + 4)}
              data={completionRateByGradeData}
              frontColor="teal"
              spacing={6}
              maxValue={100}
              noOfSections={5}
            />
          </View>
          <Button className="grow" mode='contained' 
            onPress={() => onLogoutPress()}>Logout</Button>
        </View>
      </ScrollView>
    </View>
  )
}

export default ProfileScreen;