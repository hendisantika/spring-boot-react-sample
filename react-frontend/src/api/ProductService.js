import client from './client';

class ProductService {
    async getAllProducts() {
        return client.get('/products');
    }

    async getProductById(productId) {
        return client.get(`/products/${productId}`);
    }

    async createProduct(product) {
        return client.post('/products', product);
    }
}

const productService = new ProductService();

export default productService;
