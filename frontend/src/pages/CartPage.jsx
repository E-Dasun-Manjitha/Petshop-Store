import { ShoppingBag } from 'lucide-react';
import api from '../api';

const CartPage = ({ cart, clearCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  
  const handleCheckout = async () => {
    try {
      await api.post('/api/orders', { items: cart, totalAmount: total });
      alert("Order placed successfully! 🐾");
      clearCart();
    } catch (_err) {
      alert("Failed to place order.");
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ShoppingBag /> Your Cart
      </h2>
      
      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--bg-card)', borderRadius: '16px' }}>
          <p style={{ color: 'var(--text-muted)' }}>Your cart is empty. Time to spoil your pet!</p>
        </div>
      ) : (
        <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '16px' }}>
          {cart.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ fontWeight: '600' }}>{item.name}</span>
              <span style={{ color: 'var(--accent)' }}>Rs. {item.price}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
            <span>Total:</span>
            <span>Rs. {total}</span>
          </div>
          <button onClick={handleCheckout} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '2rem', padding: '1rem' }}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};
export default CartPage;
