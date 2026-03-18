// src/pages/Cart.jsx
import { useCart } from '../context/CartContext';
export default function Cart() {
    const { items, totalPrice, removeItem, increaseQuantity, decreaseQuantity, clearCart } = useCart();
    if (items.length === 0) {
        return (
            <div className='page-wrap'>
                <div className='empty-state'>
                    <h2 className='page-title'>Keranjang Kosong</h2>
                    <p className='muted-text'>Belum ada produk di keranjang Anda.</p>
                </div>
            </div>
        );
    }

    return (
        <div className='page-wrap'>
            <h2 className='page-title'>Keranjang Belanja</h2>
            <div className='cart-list'>
                {items.map((item) => (
                    <article key={item.id} className='cart-item'>
                        <img
                            src={item.image}
                            alt={item.title}
                            className='cart-item__img'
                        />

                        <div className='cart-item__info'>
                            <h4 className='cart-item__title'>{item.title}</h4>
                            <p className='cart-item__unit-price'>${item.price.toFixed(2)} / item</p>
                        </div>

                        <div className='cart-item__qty'>
                            <div className='qty-control'>
                                <button
                                    onClick={() => decreaseQuantity(item.id)}
                                    className='qty-control__btn'
                                >
                                    -
                                </button>
                                <span className='qty-control__value'>{item.quantity}</span>
                                <button
                                    onClick={() => increaseQuantity(item.id)}
                                    className='qty-control__btn'
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <p className='cart-item__subtotal'>
                            ${(item.price * item.quantity).toFixed(2)}
                        </p>

                        <button
                            onClick={() => removeItem(item.id)}
                            className='btn btn--danger cart-item__remove'
                        >
                            Hapus
                        </button>
                    </article>
                ))}
            </div>

            <div className='cart-summary'>
                <h3 className='cart-summary__total'>Total: ${totalPrice.toFixed(2)}</h3>
                <button onClick={clearCart} className='btn btn--primary'>
                    Checkout
                </button>
            </div>
        </div>
    );
}