import axios from 'axios';

const USER_API_URL = 'https://api.marktube.tv/v1/me';

export default class UserService {
  static login(email, password) {
    return axios.post(USER_API_URL, {
      email,
      password,
    });
  }

  static logout(token) {
    return axios.delete(USER_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
