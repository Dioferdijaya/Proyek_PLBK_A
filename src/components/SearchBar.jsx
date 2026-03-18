// src/components/SearchBar.jsx
export default function SearchBar({ value, onChange }) {
    return (
        <div className='searchbar'>
            <input
                type='text'
                placeholder='Cari produk berdasarkan nama...'
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className='searchbar__input'
            />
        </div>
    );
}
