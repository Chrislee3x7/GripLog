import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import Home from './Home';


const GripLog = () => {
  
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator className="mt-12 ml-8 mr-8" initialRouteName="Login" 
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Register" component={RegisterScreen}/> 
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  )
}

export default GripLog;