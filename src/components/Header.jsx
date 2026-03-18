// src/components/Header.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
export default function Header() {
    const { totalItems } = useCart();
    return (
        <header className='header'>
            <div className='header__inner'>
                <Link to='/' className='header__brand'>
                    CBSE Store
                </Link>
                <nav className='header__nav'>
                    <Link to='/' className='header__link'>
                        Home
                    </Link>
                    <Link to='/cart' className='header__link'>
                    Cart ({totalItems})
                    </Link>
                </nav>
            </div>
        </header>
    );
}