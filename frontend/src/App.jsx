import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  const [cart, setCart] = useState([]);
  // eslint-disable-next-line no-unused-vars -- Used in Task 3 routes
  const addToCart = (product) => setCart([...cart, product]);
  // eslint-disable-next-line no-unused-vars -- Used in Task 3 routes
  const clearCart = () => setCart([]);

  return (
    <BrowserRouter>
      <Navbar cartCount={cart.length} />
      <Routes>
        <Route path="/" element={
          <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Spoil Your <span style={{ color: 'var(--accent)'}}>Best Friend</span></h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>Premium toys, nutritious food, and top-tier equipment for the pets you love.</p>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
