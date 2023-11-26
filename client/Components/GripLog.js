import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import Home from './Home';
import { View } from 'react-native';


const GripLog = () => {
  
  const Stack = createNativeStackNavigator();

  return (
    // <View className="mt-12 border-blue-500 border-3">
      <Stack.Navigator className="ml-8 mr-8" initialRouteName="Login" 
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={RegisterScreen}/> 
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    // </View>
  )
}

export default GripLog;