import axios from "axios";

const USER_BASE_REST_API_URL = 'http://192.168.2.40:8080/user/list';

class UserDetailsService{
    getAllUsersList(){

        return axios.get(USER_BASE_REST_API_URL)
    }
}


export default new UserDetailsService();



