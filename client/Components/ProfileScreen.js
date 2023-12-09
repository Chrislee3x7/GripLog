import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Card, Text, Button, Divider } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';
import { useFocusEffect } from '@react-navigation/core';



const ProfileScreen = ({ navigation }) => {
  
  const [problemCount, setProblemCount] = useState(0);
  const [sentProblemCount, setSentProblemCount] = useState(0);
  const [averageAttemptsToSend, setAverageAttemptsToSend] = useState(0);

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
    const averageAttemptsToSend = res.data.average_attempt_count;
    console.log(averageAttemptsToSend);
    setAverageAttemptsToSend(averageAttemptsToSend);
  }

  const onLogoutPress = async () => {
    // attempt to logout
    const logoutRes = await AuthService.logout();
    console.log(logoutRes);
    // return to login screen
    navigation.navigate("Login");
  }

  return (
    <View className="mt-12 mx-4">
      <Text className="mt-6 mb-4 mx-4" variant="headlineLarge">Profile</Text>
      <ScrollView>
        <View className="gap-y-2 mx-2">
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
          <View className="flex-row">
            <Text className="my-2" variant="titleMedium">Average Attempts to Send:</Text>
            <View className="grow"/>
            <Text className="my-2" variant="titleMedium">{averageAttemptsToSend}</Text>
          </View>
            <Button className="grow" mode='contained' 
              onPress={() => onLogoutPress()}>Logout</Button>
        </View>
      </ScrollView>
    </View>
  )
}

export default ProfileScreen;