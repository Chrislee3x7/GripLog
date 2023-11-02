import React from 'react';
import { View } from 'react-native';
import { API_URL } from '@env';
import { Text, TextInput, Button } from 'react-native-paper';
import axios from 'axios';

const onRegisterPress = (name, email, username, password) => {
  console.log(`${API_URL}/users/register`);
  axios.post(`${API_URL}/users/register`,
    {
      name: name,
      email: email,
      username: username,
      password: password
    }
	)
  .then((res) => {
    console.log("yayyyy");
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });

  // if (res.status == 200) {
  //   console.log(res);
  // } else {
  //   console.log(res.headers);
  // }
}

const Register = () => {

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');


  return (
    <View>
      <Text variant="headlineLarge">Register</Text>
      <View className="my-2 ml-4 mr-4">
        <Text variant="titleSmall">Name</Text>
        <TextInput
          className=""
          mode={'outlined'}
          label='Name'
          value={name}
          onChangeText={name => setName(name)}
        />
      </View>
      <View className="my-2 ml-4 mr-4">
        <Text variant="titleSmall">Email</Text>
        <TextInput
          className=""
          mode={'outlined'}
          label='Email'
          value={email}
          onChangeText={email => setEmail(email)}
        />
      </View>
      <View className="my-2 ml-4 mr-4">
        <Text variant="titleSmall">Username</Text>
        <TextInput
          className=""
          mode={'outlined'}
          label='Username'
          value={username}
          onChangeText={username => setUsername(username)}
        />
      </View>
      <View className="my-2 ml-4 mr-4">
        <Text variant="titleSmall">Password</Text>
        <TextInput
          className=""
          mode={'outlined'}
          label='Password'
          value={password}
          onChangeText={password => setPassword(password)}
        />
      </View>
      <View className="my-2 flex flex-nowrap">
          <Button className="" mode='contained-tonal'>Cancel</Button>
          <Button className="" mode='contained-tonal' 
            onPress={() => onRegisterPress(name, email, username, password)}>Register</Button>
      </View>
    </View>
  )
}

export default Register;
