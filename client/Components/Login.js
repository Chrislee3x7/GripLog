import React from 'react';
import { API_URL } from '@env';
import { View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import axios from 'axios';


const Login = () => {


  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const onCancelPress = () => {
    console.log("TODO: cancel pressed.");
  }

  const onRegisterPress = () => {
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
  
    axios.post(`${API_URL}/users/login`,
      {
        email: email,
        password: password
      }
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <View className="">
      <Text className="mt-6 mb-4" variant="headlineLarge">Login</Text>
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
        <Button className="shrink mx-2 w-1/2" mode='contained-tonal'
          onPress={() => onCancelPress()}>Cancel</Button>
        <Button className="shrink mx-2 w-1/2" mode='contained' 
          onPress={() => onRegisterPress()}>Register</Button>
      </View>
    </View>
  )
}



// const styles = StyleSheet.create({
//   align_title: {
//     alignSelf: 'center'
//   },
//   align_left: {
//     alignSelf: 'flex-start'
//   },
//   font: {
//     fontSize: 20,
//     fontWeight: 'bold'
//   },
//   border: {
//     borderWidth: 1,
//     borderStyle: 'solid',
//     borderRadius: '10'
//   }
// })


export default Login;
