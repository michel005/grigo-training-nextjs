import axios, { Axios } from 'axios'

export default abstract class Business {
    static axiosInstance: Axios = axios
    static authHeader = () => {
        return {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            },
        }
    }

    static {
        this.axiosInstance.defaults.baseURL = 'http://localhost:8080/api'
    }
}
