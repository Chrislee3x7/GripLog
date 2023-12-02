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
    const auth = await authHeader();
    // console.log(problemId);
    return axios.get(`${API_URL}/attempts`, { params: 
      {
        problem_id: problemId
      }, headers: auth
    });
  }

  async editAttempt(attemptId, date, notes, isSend) {
    // console.log("got to user.service");
    const auth = await authHeader();
    return axios.put(`${API_URL}/attempts`, {
      attempt_id: attemptId,
      date: date,
      notes: notes,
      isSend: isSend
    }, { headers: auth });
  }

  async createAttempt(problemId, date, notes, isSend) {
    // console.log("got to user.service");
    const auth = await authHeader();
    return axios.post(`${API_URL}/attempts`, {
      problem_id: problemId,
      date: date,
      notes: notes,
      isSend: isSend
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

  async deleteProblem(id) {
    const auth = await authHeader();
    return axios.delete(`${API_URL}/problems`, {
      data: {
        problem_id: id
      },
      headers: auth,
    });
  }
}

export default new UserService();