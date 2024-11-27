import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/orders";

class OrderService {
    async getAllOrders() {
        return axios.get(API_BASE_URL);
    }

    async getOrderById(orderId) {
        return axios.get(`${API_BASE_URL}/${orderId}`);
    }

    async createOrder(order) {
        return axios.post(API_BASE_URL, order);
    }
}

const orderService = new OrderService()

export default orderService;
