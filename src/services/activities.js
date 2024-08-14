import axios from 'axios';

class ActivityDataService {

    getAll() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/`);
    }

    getByUserId(userId) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/activities/user/${userId}`);
    }


    createActivity(data) {
        console.log(`data received in services: ${data}`); // debugging
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/`, data);
    }

    addLike(activityId, userId) {
        console.log(`Patching activityId: ${activityId}, userId: ${userId}`); // Debugging
        return axios.patch(`${process.env.REACT_APP_API_BASE_URL}/api/v1/activities/${activityId}/like`, {
            user_id: userId // Ensure the key matches what the backend expects
        });
    }

}

export default new ActivityDataService();