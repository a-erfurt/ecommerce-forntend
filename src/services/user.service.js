import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/user/';

class UserService {
    userId = JSON.parse(localStorage.getItem('user')).id;
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard(userId) {
        return axios.get(API_URL + `${userId}`, { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }

    getUserTransactions(userId) {
        return axios.get(API_URL + `${userId}/transactions`, { headers: authHeader() });
    }

    createTransaction(userId, transactionData) {
        return axios.put(API_URL + `${userId}/transactions/create`, transactionData, { headers: authHeader() });
    }

}

export default new UserService();