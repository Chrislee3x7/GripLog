import React from 'react';
import { API_URL } from '@env';
import { View } from 'react-native';
import { HelperText, Text, TextInput, Button, IconButton } from 'react-native-paper';
import axios from 'axios';
import AuthService from '../services/auth.service';



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
  
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('transitionEnd', (e) => {
      // Do something
      if (e.data.closing) {
        clearFields();
      }
    });
  
    return unsubscribe;
  }, [navigation]);

  const onCancelPress = () => {
    console.log("TODO: cancel pressed.");
  }

  const clearFields = () => {
    setName('');
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setNameError('');
    setEmailError('');
    setUsernameError('')
    setPasswordError('');
    setConfirmPasswordError('');
  }

  const onRegisterPress = async () => {
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

    let err = null;

    const registerRes = await AuthService.register(username, name, email, password);
    if (Math.floor(registerRes.status / 100) != 2) {
      setEmailError("Email already in use!");
      return;
    } else {
      console.log(registerRes.status);
      const loginRes = await AuthService.login(email, password);
      if (Math.floor(loginRes.status / 100) != 2) {
        console.log(loginRes.data);
        return;
      }
      navigation.navigate("Home");
      clearFields();
    }
  }

  // Try onSubmitEditing to go to next text box or if last, submit

  return (
    <View className="mt-12 ml-8 mr-8">
      <Text className="mt-6 mb-4 mx-4" variant="headlineLarge">Register</Text>
      <View className="mb-4 ml-4 mr-4">
        <TextInput
          autoCapitalize="words"
          blurOnSubmit
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
          autoCapitalize="none"
          blurOnSubmit
          inputMode="email"
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
          autoCapitalize="none"
          blurOnSubmit
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
          autoCapitalize="none"
          blurOnSubmit
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
