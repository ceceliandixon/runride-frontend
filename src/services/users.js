import axios from 'axios';


class UserDataService  {

    createUser(data) {
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/users`, data);
      }


    getUser(userId) {
        console.log(`Getting user: ${userId}`); // Debugging
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/users/${userId}`);
    }

    addFriend(userId, friendId) {
      console.log(`Patching userId: ${userId}, friendId: ${friendId}`); // Debugging
      return axios.patch(`${process.env.REACT_APP_API_BASE_URL}/api/v1/users/${userId}/friend`, {
          friendId: friendId // Ensure the key matches what the backend expects
      });
  }
  
    getAll(userId) {
      return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/users/${userId}`);
    }
  }
  
  export default new UserDataService();