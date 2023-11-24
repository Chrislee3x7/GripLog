import axios from 'axios';
import authHeader from './auth-header';
import { API_URL } from '@env';

class UserService {
  async getProblems() {
    // console.log("header!")
    // console.log(await authHeader());
    return axios.get(API_URL + '/problems', { headers: await authHeader() });
  }

  async createProblem() {
    return axios.post(API_URL + '/problems', { headers: await authHeader() });
  }
}

export default new UserService();