import axios from 'axios';

/**
 * All requests go through the API gateway, which routes them to the right service via Eureka.
 * Override with REACT_APP_API_BASE_URL (e.g. in a .env file) if the gateway runs elsewhere.
 */
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {'Content-Type': 'application/json'},
});

export default client;
