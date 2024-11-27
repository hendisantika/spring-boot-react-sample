
import {
    Route, 
    BrowserRouter as Router, 
    Routes
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import MenuComponent from "./components/MenuComponent";
import ProductComponent from "./components/ProductComponent";
import OrderComponent from "./components/OrderComponent";

function App() {
    return (
        <>        
            <Router>
                <MenuComponent />    

                <div className="container">
                    <Routes>
                        <Route path="/" element={<ProductComponent />}/>
                        <Route path="/products" element={<ProductComponent />}/>
                        <Route path="/orders" element={<OrderComponent />}/>
                    </Routes>
                </div>
            </Router>
        </>

    );
}

export default App;
