import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';

function App() {
  const [cart, setCart] = useState([]);
  const addToCart = (product) => setCart([...cart, product]);
  const clearCart = () => setCart([]);

  return (
    <BrowserRouter>
      <Navbar cartCount={cart.length} />
      <Routes>
        <Route path="/" element={<div style={{ textAlign: 'center', padding: '4rem 1rem' }}><h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Spoil Your <span style={{ color: 'var(--accent)'}}>Best Friend</span></h1><p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>Premium toys, nutritious food, and top-tier equipment.</p></div>} />
        <Route path="/category/:categoryName" element={<CategoryPage addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} clearCart={clearCart} />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
