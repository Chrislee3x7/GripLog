import React, { useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ProblemScreen from './ProblemScreen';
import SocialScreen from './SocialScreen';
import ProfileScreen from './ProfileScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Home = ({ navigation }) => {

  const Tab = createMaterialBottomTabNavigator();

  const safeAreaInsets = useSafeAreaInsets();

  return (
    <Tab.Navigator 
      initialRouteName="Problems" 
      shifting="true"
      backBehavior="initialRoute"
      tabBarStyle={{
        style: {
          height: safeAreaInsets.bottom,
        },
        tabStyle: {
          height: 0
        }
      }}>
      <Tab.Screen name="Problems" component={ProblemScreen} 
        options={{
          tabBarLabel: 'Problems',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}/>
      <Tab.Screen name="Social" component={SocialScreen} options={{
          tabBarLabel: 'Social',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-group" color={color} size={26} />
          ),
        }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}/>
    </Tab.Navigator>
  )
}

export default Home;