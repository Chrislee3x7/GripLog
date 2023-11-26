import axios from 'axios';
import authHeader from './auth-header';
import { API_URL } from '@env';

class UserService {
  async getProblems() {
    // console.log("header!")
    // console.log(await authHeader());
    return axios.get(`${API_URL}/problems`, { headers: await authHeader() });
  }

  async createProblem(color, grade, name, location) {
    console.log("got to create problem");
    const auth = await authHeader();
    return axios.post(`${API_URL}/problems`, {
      color: color,
      grade: grade,
      name: name,
      location: location
    }, { headers: auth });
  }
}

export default new UserService();