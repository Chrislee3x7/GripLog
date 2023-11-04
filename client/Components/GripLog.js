import React, { useState } from 'react';
import { View } from 'react-native';
import { useTheme, Text, Button } from 'react-native-paper';
import Login from './Login';
import Register from './Register';


const GripLog = () => {
  const theme = useTheme();
  
  const [title, setTitle] = useState('GripLog');

  return (
    <View className="mt-12 ml-8 mr-8">
      {/* <Register></Register> */}
      <Login></Login>
    </View>
  )
}

export default GripLog;