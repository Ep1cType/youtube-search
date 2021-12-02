import axios from "axios";

export default class AuthService {
  static async getUsers() {
    return axios.get('./users.json')
  }
}
