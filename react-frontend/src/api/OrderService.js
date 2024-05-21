import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/orders";

class OrderService {
    getAllOrders() {
        return axios.get(API_BASE_URL);
    }

    getOrderById(orderId) {
        return axios.get(`${API_BASE_URL}/${orderId}`);
    }

    createOrder(order) {
        return axios.post(API_BASE_URL, order);
    }
}

export default new OrderService();
