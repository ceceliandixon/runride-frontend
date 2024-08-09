import axios from 'axios';

class ActivityDataService {

    getAll(page = 0) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/activities?page=${page}`);
    } // does this need modification for endless scrolling??

    find(query, by='title', page=0) {
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/activities?${by}=${query}&page=${page}`
        );
    }

    createActivity(data) {
        console.log(`data received in services: ${data}`); // debugging
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/`, data);
    }

    // get ratings?

}

export default new ActivityDataService();