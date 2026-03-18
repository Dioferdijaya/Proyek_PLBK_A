// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../services/Api.js';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import SearchBar from '../components/SearchBar';
export default function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const [productsData, categoriesData] = await Promise.all([
                    getProducts(),
                    getCategories(),
                ]);
                setProducts(productsData);
                setCategories(categoriesData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    const filteredProducts = products.filter((product) => {
        const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchName = product.title.toLowerCase().includes(searchTerm.toLowerCase());

        return matchCategory && matchName;
    });
    if (loading) return <Loading />;
    if (error) {
        return (
            <div className='page-wrap'>
                <div className='error-state'>
                    <p className='error-state__text'>Error: {error}</p>
                    <p className='muted-text'>Terjadi kendala saat memuat katalog produk.</p>
                </div>
            </div>
        );
    }

    return (
        <div className='page-wrap'>
            <h2 className='page-title'>Katalog Produk</h2>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <div className='category-filters'>
                <button
                    onClick={() => setSelectedCategory('all')}
                    className={`chip-btn ${selectedCategory === 'all' ? 'is-active' : ''}`}
                >
                    Semua
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`chip-btn ${selectedCategory === cat ? 'is-active' : ''}`}
                        style={{ textTransform: 'capitalize' }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className='products-grid'>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className='empty-state'>
                        <p className='muted-text'>
                        Produk tidak ditemukan untuk kata kunci tersebut.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
