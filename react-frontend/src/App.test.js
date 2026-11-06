import {render, screen} from '@testing-library/react';
import App from './App';
import ProductService from './api/ProductService';
import OrderService from './api/OrderService';

jest.mock('./api/ProductService', () => ({
    __esModule: true,
    default: {getAllProducts: jest.fn(), createProduct: jest.fn()},
}));

jest.mock('./api/OrderService', () => ({
    __esModule: true,
    default: {getAllOrders: jest.fn(), createOrder: jest.fn()},
}));

beforeEach(() => {
    // CRA enables resetMocks, so implementations are (re)defined before every test
    ProductService.getAllProducts.mockResolvedValue({data: [{id: 1, name: 'Mechanical Keyboard', price: 1250000}]});
    OrderService.getAllOrders.mockResolvedValue({data: []});
});

test('renders the navigation and the product catalog', async () => {
    render(<App/>);

    expect(screen.getByText('MicroShop')).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Products'})).toBeInTheDocument();
    expect(await screen.findByText('Mechanical Keyboard')).toBeInTheDocument();
});

test('shows an error state with a retry button when the API is unreachable', async () => {
    ProductService.getAllProducts.mockRejectedValue(new Error('Network Error'));
    render(<App/>);

    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /try again/i})).toBeInTheDocument();
});
