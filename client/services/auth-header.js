import * as SecureStore from 'expo-secure-store';

export default async function authHeader() {
  const accessToken = await SecureStore.getItemAsync('accessToken');
  // console.log("accessToken in authHeader funcc")
  // console.log(accessToken);
  if (accessToken) {
    return { 'Authorization': 'Bearer ' + accessToken };
  } else {
    return {};
  }
}