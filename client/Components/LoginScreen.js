import React from 'react';
import { API_URL } from '@env';
import { View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';


const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const onCancelPress = () => {
    console.log("TODO: cancel pressed.");
  }

  const onLoginPress = async () => {
    navigation.navigate("Home");
    return;
    // TODO input checking
    let isValid = true;
    if (!email) {
      isValid = false;
      setEmailError("Please input a valid email!");
    } else {
      setEmailError('');
    }
    if (!password) {
      isValid = false; 
      setPasswordError("Please input a password!");
    } else {
      setPasswordError('');
    }
  
    if (!isValid) return; // do not make request, simply return
  
    try {
      console.log("trying post login");
      const res = await axios.post(`${API_URL}/users/login`,
      {
        email: email,
        password: password
      });
      console.log(res.data.token);
      await SecureStore.setItemAsync('jwt', res.data.token);
      const token = await SecureStore.getItemAsync('jwt');
      console.log(token);
    } catch (err) {
      console.log(err);
      return;
    }
    
    // axios.post(`${API_URL}/users/login`,
    //   {
    //     email: email,
    //     password: password
    //   }
    // )
    // .then(async (res) => {
    //   console.log(res.data.token);
    //   // await SecureStore.setItemAsync('jwt', res.body.token);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  }

  return (
    <View className="mt-12 ml-8 mr-8">
      <Text className="mt-6 mb-4 mx-4" variant="headlineLarge">Login</Text>
      <View className="mb-4 ml-4 mr-4">
        <TextInput
          mode={'outlined'}
          label='Email'
          value={email}
          error={emailError}
          onChangeText={email => setEmail(email)}
        />
        {emailError ? <HelperText type="error" visible={true}>{emailError}</HelperText> : null}
      </View>
      <View className="mb-4 ml-4 mr-4">
        <TextInput
          mode={'outlined'}
          label='Password'
          value={password}
          error={passwordError}
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
        {passwordError ? <HelperText type="error" visible={true}>{passwordError}</HelperText> : null}
      </View>
  
      <View className="my-4 flex-row">
        {/* <Button className="shrink mx-2 w-1/2" mode='contained-tonal'
          onPress={() => onCancelPress()}>Cancel</Button> */}
        <Button className="mx-2 grow" mode='contained' 
          onPress={() => onLoginPress()}>Login</Button>
      </View>
      <Button className="mx-4 self-end" mode='text'
        onPress={() => navigation.navigate('Register')}>I'm new here!</Button>
    </View>
  )
}

export default LoginScreen;
