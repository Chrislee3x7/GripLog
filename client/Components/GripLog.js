import React, { useState } from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme, Text, Button } from 'react-native-paper';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';


const GripLog = () => {
  
  const Stack = createNativeStackNavigator();
  
  const [title, setTitle] = useState('GripLog');

  return (
    <Stack.Navigator className="mt-12 ml-8 mr-8" initialRouteName="Register" 
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Register" component={RegisterScreen}/> 
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  )
}

export default GripLog;