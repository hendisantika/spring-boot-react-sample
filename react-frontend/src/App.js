import './App.css';
import {Route, Router, Routes} from "react-router-dom";
import ProductComponent from "./components/ProductComponent";
import OrderComponent from "./components/OrderComponent";

function App() {
    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route path="/" element={<ProductComponent/>}/>
                    <Route path="/products" element={<ProductComponent/>}/>
                    <Route path="/orders" element={<OrderComponent/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
