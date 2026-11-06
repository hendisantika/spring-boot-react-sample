import client from './client';

class OrderService {
    async getAllOrders() {
        return client.get('/orders');
    }

    async getOrderById(orderId) {
        return client.get(`/orders/${orderId}`);
    }

    async createOrder(order) {
        return client.post('/orders', order);
    }
}

const orderService = new OrderService();

export default orderService;
