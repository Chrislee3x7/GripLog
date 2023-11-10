import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProblemListView from './ProblemListView';
import LoginScreen from './LoginScreen';


const ProblemScreen = () => {
  
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator className="mt-12 ml-8 mr-8" initialRouteName="ProblemList" 
      screenOptions={{
      headerShown: false}}>
        {/* <Stack.Screen name="ProblemList" component={ProblemListView} /> */}
        <Stack.Screen name="Login" component={ProblemListView} />
      {/* Put Problem list here and FAB for problem creation */}
    </Stack.Navigator>
  )
}

export default ProblemScreen;