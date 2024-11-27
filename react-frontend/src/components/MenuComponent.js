import { Link } from "react-router-dom";

const MenuComponent = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/products" className="nav-link">Products</Link>
          </li>
          <li className="nav-item">
            <Link to="/orders" className="nav-link">Orders</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default MenuComponent