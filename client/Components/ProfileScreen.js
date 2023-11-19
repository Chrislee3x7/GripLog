import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Card, Text, Button } from 'react-native-paper';
import { View } from 'react-native';
import AuthService from '../services/auth.service';



const ProfileScreen = ({ navigation }) => {
  
  const Stack = createNativeStackNavigator();

  const onLogoutPress = async () => {
    // attempt to logout
    const logoutRes = await AuthService.logout();
    console.log(logoutRes);
    // return to login screen
    navigation.navigate("Login");
  }

  return (
    <View className="mt-8">
      <Text>This is the Profile Screen!</Text>
      <Button className="mx-2 grow" mode='contained' 
          onPress={() => onLogoutPress()}>Logout</Button>
    </View>

  )
}

export default ProfileScreen;