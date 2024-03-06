import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class UserService {
    userId = JSON.parse(localStorage.getItem('user')).id;
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard(userId) {
        return axios.get(API_URL + `user/${userId}`, { headers: authHeader() });
    }

    getAdminBoard(userId) {
        return axios.get(API_URL + `admin/${userId}`, { headers: authHeader() });
    }

    getUserTransactions(userId) {
        return axios.get(API_URL + `user/${userId}/transactions`, { headers: authHeader() });
    }

    createTransaction(userId, transactionData) {
        return axios.put(API_URL + `user/${userId}/transactions/create`, transactionData, { headers: authHeader() });
    }

    getAllUsers() {
        return axios.get(API_URL + 'admin/allUsers', { headers: authHeader() });
    }
}

export default new UserService();