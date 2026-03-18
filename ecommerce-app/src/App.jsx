import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';

function App() {
    return (
        <div className='app-shell'>
            <CartProvider>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/product/:id' element={<ProductDetail />} />
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </div>
    );
}

export default App;
