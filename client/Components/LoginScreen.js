import React from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import AuthService from '../services/auth.service'


const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const onCancelPress = () => {
    console.log("TODO: cancel pressed.");
  }

  const onLoginPress = async () => {
    // input checking
    let isValid = true;
    if (!email) {
      isValid = false;
      setEmailError("Please enter a valid email!");
    } else {
      setEmailError('');
    }
    if (!password) {
      isValid = false; 
      setPasswordError("Please enter a password!");
    } else {
      setPasswordError('');
    }
  
    // if anything is invalid, do not make request, simply return
    if (!isValid) return; 
  
    const loginRes = await AuthService.login(email, password);
    // console.log(loginRes);
    navigation.navigate("Home")

    return;
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
          onChangeText={email => {setEmail(email); setEmailError('');}}
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
          onChangeText={password => {setPassword(password); setPasswordError('');}}
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
