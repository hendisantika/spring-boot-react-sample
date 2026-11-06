import OrderService from '../api/OrderService';
import {useResource} from './useResource';

const fetchAll = () => OrderService.getAllOrders();
const createOne = (order) => OrderService.createOrder(order);

export const useOrderList = () => useResource(fetchAll, createOne, 'orders');
