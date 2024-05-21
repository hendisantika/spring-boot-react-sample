import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/products";

class ProductService {
    getAllProducts() {
        return axios.get(API_BASE_URL);
    }

    getProductById(productId) {
        return axios.get(`${API_BASE_URL}/${productId}`);
    }

    createProduct(product) {
        return axios.post(API_BASE_URL, product);
    }
}

export default new ProductService();
