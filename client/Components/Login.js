import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';

const Login = () => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


  return (
    <View className="m-4">
      <Text variant="headlineLarge">Login</Text>
      <View className="mb-4">
        <Text variant="titleSmall">Email</Text>
        <TextInput
          className=""
          mode={'outlined'}
          label='Email'
          value={email}
          onChangeText={email => setEmail(email)}
        />
      </View>
      <View className="mb-4">
        <Text variant="titleSmall">Password</Text>
        <TextInput
          className=""
          mode={'outlined'}
          label='Password'
          value={password}
          onChangeText={password => setPassword(password)}
        />
      </View>
      <View className="flex flex-nowrap">
          <Button className="flex-shrink" mode='contained-tonal'>Cancel</Button>
          <Button className="" mode='contained-tonal'>Sign Innnnnn</Button>
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
