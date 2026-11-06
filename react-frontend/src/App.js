import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';

import './App.css';

import {ToastProvider} from './context/ToastContext';
import Footer from './components/Footer';
import MenuComponent from './components/MenuComponent';
import OrderComponent from './components/OrderComponent';
import ProductComponent from './components/ProductComponent';

function App() {
    return (
        <ToastProvider>
            <Router>
                <div className="app-shell d-flex flex-column min-vh-100">
                    <MenuComponent/>
                    <main className="container flex-grow-1 py-4 py-lg-5">
                        <Routes>
                            <Route path="/" element={<Navigate to="/products" replace/>}/>
                            <Route path="/products" element={<ProductComponent/>}/>
                            <Route path="/orders" element={<OrderComponent/>}/>
                            <Route path="*" element={<Navigate to="/products" replace/>}/>
                        </Routes>
                    </main>
                    <Footer/>
                </div>
            </Router>
        </ToastProvider>
    );
}

export default App;
