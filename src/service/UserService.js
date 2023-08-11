import axios from 'axios'

const EMPLOYEE_BASE_REST_API_URL = 'http://192.168.2.40:8080/user/deleteUser';

class UserService{

    createUser(users){
        return axios.post(EMPLOYEE_BASE_REST_API_URL, users)
    }

}
export default new UserService();