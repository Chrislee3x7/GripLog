import React, { useState } from 'react';
import ProblemListView from './ProblemListView';
import ProblemDetailScreen from './ProblemDetailScreen'
// import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './RegisterScreen';


const ProblemScreen = () => {

  const StackI = createNativeStackNavigator();

  return (
    <StackI.Navigator className="ml-8 mr-8" initialRouteName="ProblemList" 
      screenOptions={{
        headerShown: false
      }}>
      <StackI.Screen name="ProblemList" component={ProblemListView} />
      <StackI.Screen name="ProblemDetail" component={ProblemDetailScreen} />
      
      {/* <Stack.Screen name="Register" component={RegisterScreen}/>  */}
      {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
    </StackI.Navigator>
  )
}

export default ProblemScreen;