import axios from 'axios';


class UserDataService  {

    createUser(data) {
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/users`, data);
      }

    updateFriendsList(data) {
      return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/users`, data);
    }

    getUser(userId) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/users/${userId}`);
    }
  
    getAll(userId) {
      return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/users/${userId}`);
    }
  }
  
  export default new UserDataService();