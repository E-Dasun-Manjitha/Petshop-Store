import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Plus } from 'lucide-react';
import api from '../api';

const CategoryPage = ({ addToCart }) => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    api.get(`/api/products?category=${categoryName}`)
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products", err));
  }, [categoryName]);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ textTransform: 'capitalize', fontSize: '2rem', marginBottom: '2rem', borderBottom: '2px solid var(--accent)', display: 'inline-block' }}>
        {categoryName}
      </h2>
      <div className="grid-layout">
        {products.length === 0 ? <p>No products found in this category.</p> : products.map(p => (
          <div key={p._id} className="product-card">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{p.name}</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', flex: 1 }}>{p.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent)' }}>Rs. {p.price}</span>
              <button className="btn-primary" onClick={() => addToCart(p)}><Plus size={18}/> Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CategoryPage;
