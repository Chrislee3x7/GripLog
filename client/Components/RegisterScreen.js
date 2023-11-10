import React from 'react';
import { API_URL } from '@env';
import { View } from 'react-native';
import { HelperText, Text, TextInput, Button, IconButton } from 'react-native-paper';
import axios from 'axios';



const RegisterScreen = ({ navigation }) => {
  
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  // Error messages
  const [nameError, setNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [usernameError, setUsernameError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState('');
  
  const onCancelPress = () => {
    console.log("TODO: cancel pressed.");
  }

  const onRegisterPress = () => {
    // TODO input checking
    let isValid = true;
    if (!name) {
      isValid = false; 
      setNameError("Uh-oh! All Grippers must have a name!");
    } else {
      setNameError('');
    }
    if (!email) {
      isValid = false;
      setEmailError("Uh-oh! All Grippers must have an email!");
    } else {
      setEmailError('');
    }
    if (!username) {
      isValid = false;
      setUsernameError("Uh-oh! All Grippers must have a username!");
    } else {
      setUsernameError('');
    }
    if (!password) {
      isValid = false; 
      setPasswordError("Uh-oh! All Grippers must have a password!");
    } else {
      setPasswordError('');
    }
    
    if (password != confirmPassword) {
      isValid = false;
      setConfirmPasswordError("Uh-oh! Passwords must match!");
    } else {
      setConfirmPasswordError('');
    }
  
    if (!isValid) return; // do not make request, simply return
  
    axios.post(`${API_URL}/users/register`,
      {
        name: name,
        email: email,
        username: username,
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
    <View className="mt-12 ml-8 mr-8">
      <Text className="mt-6 mb-4 mx-4" variant="headlineLarge">Register</Text>
      <View className="mb-4 ml-4 mr-4">
        <TextInput
          mode={'outlined'}
          label='Name'
          value={name}
          error={nameError}
          onChangeText={name => setName(name)}
        />
        {nameError ? <HelperText type="error" visible={true}>{nameError}</HelperText> : null}
      </View>
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
          label='Username'
          value={username}
          error={usernameError}
          onChangeText={username => setUsername(username)}
        />
        {usernameError ? <HelperText type="error" visible={true}>{usernameError}</HelperText> : null}
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
      <View className="mb-4 ml-4 mr-4">
        <TextInput
          mode={'outlined'}
          label='Confirm Password'
          value={confirmPassword}
          error={confirmPasswordError}
          secureTextEntry={true}
          onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
        />
        {confirmPasswordError ? <HelperText type="error" visible={true}>{confirmPasswordError}</HelperText> : null}
      </View>
      <View className="my-4 flex-row">
        {/* <Button className="shrink mx-2 w-1/2" mode='contained-tonal'
          onPress={() => onCancelPress()}>Cancel</Button> */}
        <Button className="mx-2 grow" mode='contained' 
          onPress={() => onRegisterPress()}>Register</Button>
      </View>
      <Button className="self-end" mode='text'
        onPress={() => navigation.navigate('Login')}>I'm already a Gripper!</Button>
    </View>
  )
}

export default RegisterScreen;
