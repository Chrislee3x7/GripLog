import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { API_URL } from '@env';


class AuthService {
  async login(email, password) {
    return axios.post(`${API_URL}/users/login`,
    {
      email: email,
      password: password
    })
    .then(async (res) => {
      // console.log(res.data);
      await SecureStore.setItemAsync('accessToken', res.data.token);
      // const token = await SecureStore.getItemAsync('accessToken');
      // console.log(token);
      return res;
    })
    .catch((err) => {
      // console.error(err);
      return err.response;;
    });
  }

  async logout() {
    await SecureStore.deleteItemAsync('accessToken'); //Without token, user cannot access anything
    const tok = await SecureStore.getItemAsync('accessToken');
    if (tok) {
      return {succes: "false"};
    }
    return {success: "true"};
  }

  async register(username, name, email, password) {
    return axios.post(`${API_URL}/users/register`, {
      username,
      name,
      email,
      password
    })
    .then(res => {
      console.log("register was successful.");
      return res;
    })
    .catch(err => {
      // console.warn("about to return err STATUS!!");
      // console.log(err.response);
      // throw err;
      return err.response;
    });
  }

  async getCurrentUserToken() {
    return await SecureStore.getItemAsync('accessToken');
  }
}

export default new AuthService();