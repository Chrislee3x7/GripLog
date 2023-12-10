import React, { useEffect, useState, useWindowDimensions } from 'react';
import { Card, Text, Button } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';
import { BarChart } from 'react-native-gifted-charts'
import { useFocusEffect } from '@react-navigation/core';


const ProfileScreen = ({ navigation }) => {

  const [problemCount, setProblemCount] = useState(0);
  const [sentProblemCount, setSentProblemCount] = useState(0);
  const [flashedProblemCount, setFlashedProblemCount] = useState(0);
  const [averageAttemptsToSend, setAverageAttemptsToSend] = useState(0);

  const [completionRateByGradeData, setCompletionRateByGradeData] = useState([]);

  const [barChartWidth, setBarChartWidth] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      return;
    }, [])
  );

  const fetchData = async () => {
    // problem count and sent problem count
    let res = await UserService.getProblems();
    // console.log(problems.data);
    if (!res) {
      console.error('Unable to getProblems');
      return;
    }
    const problems = res.data;
    setProblemCount(problems.filter((problem) => {return problem.attemptCount >= 1}).length);
    setSentProblemCount(problems.filter((problem) => {return problem.sendCount >= 1}).length);
    
    // average attempts to send
    res = await UserService.getProblemStats();
    if (!res) {
      console.error('Unable to get average attempts to send');
      return;
    }
    const averageAttemptsToSend = res.data.average_attempt_count;
    setAverageAttemptsToSend(averageAttemptsToSend);

    // completion rate
    res = await UserService.getCompletionRateByGrade();
    if (!res) {
      console.error('Unable to get problems completion rate');
      return;
    }
    const resCompletions = res.data;
    let completions = [];
    resCompletions.map((c) => {
      completions.push({label: ("V" + c.grade), value: (c.completionRate * 100)});
    })
    setCompletionRateByGradeData(completions);

    // problems flashed
    res = await UserService.getStatsProblemsFlashed();
    if (!res) {
      console.error('Unable to get problems flashed')
    }
    let flashesByGrade = res.data;
    let numProblemsFlashed = 0;
    flashesByGrade.map((f) => {
      numProblemsFlashed += f.numFlashed;
    })
    setFlashedProblemCount(numProblemsFlashed);
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
      <Text className="mt-6 pb-4 mx-4" variant="headlineLarge">Profile</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="items-center gap-y-2">
          <View className="flex-row py-4 px-4 rounded-lg bg-slate-200">
            <Text variant="titleMedium">Problems Attempted:</Text>
            <View className="grow"/>
            <Text variant="titleMedium">{problemCount}</Text>
          </View>
          <View className="flex-row py-4 px-4 rounded-lg bg-slate-200">
            <Text variant="titleMedium">Problems Sent:</Text>
            <View className="grow"/>
            <Text variant="titleMedium">{sentProblemCount}</Text>
          </View>
          <View className="flex-row py-4 px-4 rounded-lg bg-slate-200">
            <Text variant="titleMedium">Problems Flashed:</Text>
            <View className="grow"/>
            <Text variant="titleMedium">{flashedProblemCount}</Text>
          </View>
          {/* <View className="flex-row py-4 px-4 rounded-lg bg-slate-200">
            <Text variant="titleMedium">Highest Grade Climbed:</Text>
            <View className="grow"/>
            <Text variant="titleMedium">{completionRateByGradeData.length == 0 ? "-" : completionRateByGradeData[completionRateByGradeData.length - 1].label}</Text>
          </View> */}
          <View className="flex-row py-4 px-4 rounded-lg bg-slate-200">
            <Text variant="titleMedium">Average Attempts to Send:</Text>
            <View className="grow"/>
            <Text variant="titleMedium">{averageAttemptsToSend.toFixed(1)}</Text>
          </View>
          <View className="py-4 px-4 rounded-lg bg-slate-200 items-start w-full"
            onLayout={(event) => {
              ({x, y, width, height} = event.nativeEvent.layout);
              setBarChartWidth(width);
            }}>
            <Text variant="titleMedium">Completion Rate By Grade:</Text>
            <BarChart
              className="ml-0"
              // barWidth={(windowWidth - (((completionRateByGradeData.length + 4)) * 6)) / (completionRateByGradeData.length + 4)}
              barWidth={((barChartWidth - ((completionRateByGradeData.length + 1) * 6 + 35 + 32)) / completionRateByGradeData.length)}
              data={completionRateByGradeData}
              frontColor="lightblue"
              spacing={6}
              maxValue={100}
              noOfSections={5}
              yAxisThickness={0}
              yAxisLabelSuffix="%"
              yAxisIndicesWidth={1}
              yAxisLabelWidth={35}
              isAnimated
              disableScroll
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