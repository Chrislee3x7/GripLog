import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Card, Text, Button } from 'react-native-paper';
import { View } from 'react-native';



const ProfileScreen = () => {
  
  const Stack = createNativeStackNavigator();

  return (
    <View><Text>This is the Profile Screen!</Text></View>

  )
}

export default ProfileScreen;