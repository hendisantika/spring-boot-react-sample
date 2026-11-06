import ProductService from '../api/ProductService';
import {useResource} from './useResource';

const fetchAll = () => ProductService.getAllProducts();
const createOne = (product) => ProductService.createProduct(product);

export const useProductList = () => useResource(fetchAll, createOne, 'products');
