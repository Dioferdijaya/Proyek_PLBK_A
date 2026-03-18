import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { useCart } from '../context/CartContext';
import { getProductById } from '../services/Api.js';

export default function ProductDetail() {
	const { id } = useParams();
	const { addItem } = useCart();

	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchProductDetail() {
			try {
				setLoading(true);
				setError(null);

				if (!id) {
					throw new Error('ID produk tidak ditemukan');
				}

				const data = await getProductById(id);
				setProduct(data);
			} catch (err) {
				setError(err.message || 'Gagal memuat detail produk');
			} finally {
				setLoading(false);
			}
		}

		fetchProductDetail();
	}, [id]);

	if (loading) return <Loading />;

	if (error) {
		return (
			<div className='page-wrap'>
				<div className='error-state'>
					<p className='error-state__text'>Error: {error}</p>
					<Link to='/' className='detail-back'>
						Kembali ke Home
					</Link>
				</div>
			</div>
		);
	}

	if (!product) {
		return (
			<div className='page-wrap'>
				<div className='empty-state'>
					<p className='muted-text'>Produk tidak ditemukan.</p>
					<Link to='/' className='detail-back'>
						Kembali ke Home
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className='page-wrap'>
			<Link to='/' className='detail-back'>
				← Kembali ke Home
			</Link>

			<div className='product-detail'>
				<div className='product-detail__media'>
					<img
						src={product.image}
						alt={product.title}
						className='product-detail__image'
					/>
				</div>

				<div className='product-detail__content'>
					<span className='product-detail__category'>
						{product.category}
					</span>

					<h2 className='product-detail__title'>{product.title}</h2>

					<p className='product-detail__price'>
						${product.price.toFixed(2)}
					</p>

					<p className='product-detail__desc'>
						{product.description}
					</p>

					<button
						onClick={() => addItem(product)}
						className='btn btn--primary'
					>
						+ Tambah ke Keranjang
					</button>
				</div>
			</div>
		</div>
	);
}
