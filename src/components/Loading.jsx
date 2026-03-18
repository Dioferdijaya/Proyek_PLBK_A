// src/components/Loading.jsx
export default function Loading() {
    return (
        <div className='page-wrap'>
            <div className='loading-state'>
                <div className='loading-state__spinner' />
                <p className='loading-state__text'>Memuat data...</p>
            </div>
        </div>
    );
}