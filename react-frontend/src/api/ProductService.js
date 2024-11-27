import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/products";

class ProductService {
    async getAllProducts() {
        return axios.get(API_BASE_URL);
    }

    async getProductById(productId) {
        return axios.get(`${API_BASE_URL}/${productId}`);
    }

    async createProduct(product) {
        return axios.post(API_BASE_URL, product);
    }
}

const productService = new ProductService()

export default productService;
