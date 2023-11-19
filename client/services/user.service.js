import axios from 'axios';
import authHeader from './auth-header';
import { API_URL } from '@env';

class UserService {
  getProblems() {
    return axios.get(API_URL + 'problems', { headers: authHeader() });
  }
}

export default new UserService();