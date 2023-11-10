import React, { useState } from 'react';
import { View } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const SocialScreen = () => {
  
  const Stack = createNativeStackNavigator();

  return (
    <View><Text>This is the Social Screen!</Text></View>
  )
}

export default SocialScreen;