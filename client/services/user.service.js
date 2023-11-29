import axios from 'axios';
import authHeader from './auth-header';
import { API_URL } from '@env';

class UserService {
  async getProblems() {
    const auth = await authHeader();
    // console.log("header!")
    // console.log(await authHeader());
    return axios.get(`${API_URL}/problems`, { headers: auth });
  }

  async getAttempts(problemId) {
    console.log(problemId);
    return axios.get(`${API_URL}/attempts`, { params: 
      {
        problem_id: problemId
      }
    });
  }

  async createAttempt(date, notes, isSend) {
    const auth = await authHeader();
    return axios.post(`${API_URL}/problems`, {
      date: date,
      notes: notes,
      is_send: isSend
    }, { headers: auth });
  }

  async createProblem(color, grade, name, location) {
    // console.log("got to create problem");
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