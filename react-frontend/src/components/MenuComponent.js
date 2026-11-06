import {NavLink} from 'react-router-dom';
import {useTheme} from '../hooks/useTheme';

const links = [
    {to: '/products', label: 'Products', icon: 'bi-box-seam'},
    {to: '/orders', label: 'Orders', icon: 'bi-receipt'},
];

const MenuComponent = () => {
    const {theme, toggle} = useTheme();

    return (
        <nav className="navbar app-navbar sticky-top border-bottom">
            <div className="container">
                <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2 fw-bold">
                    <span className="brand-logo"><i className="bi bi-bag-heart-fill"/></span>
                    MicroShop
                </NavLink>

                <div className="d-flex align-items-center gap-2">
                    <ul className="nav nav-pills gap-1">
                        {links.map((link) => (
                            <li key={link.to} className="nav-item">
                                <NavLink to={link.to} className="nav-link d-flex align-items-center gap-2">
                                    <i className={`bi ${link.icon}`}/>
                                    <span className="d-none d-sm-inline">{link.label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <button type="button" className="btn btn-icon" onClick={toggle}
                            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
                        <i className={`bi ${theme === 'dark' ? 'bi-sun-fill' : 'bi-moon-stars-fill'}`}/>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default MenuComponent;
