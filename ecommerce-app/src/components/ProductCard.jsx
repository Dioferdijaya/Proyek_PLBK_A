// src/components/ProductCard.jsx
// Komponen reusable untuk menampilkan produk
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
export default function ProductCard({ product }) {
    const { addItem } = useCart();
    return (
        <article className='product-card'>
            <div className='product-card__img-wrap'>
                <img
                    src={product.image}
                    alt={product.title}
                    className='product-card__img'
                />
            </div>
            <div className='product-card__content'>
                <h3 className='product-card__title'>
                    {product.title.substring(0, 58)}...
                </h3>
                <p className='product-card__price'>
                    ${product.price.toFixed(2)}
                </p>
                <div className='product-card__actions'>
                    <Link
                        to={`/product/${product.id}`}
                        className='btn btn--ghost'
                    >
                        Detail
                    </Link>
                    <button
                        onClick={() => addItem(product)}
                        className='btn btn--primary'
                    >
                        + Keranjang
                    </button>
                </div>
            </div>
        </article>
    );
}
