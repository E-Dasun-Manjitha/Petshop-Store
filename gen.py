import os

auth_modal = """import { useState } from "react";
import { X, Mail, Lock, User as UserIcon } from "lucide-react";

const AuthModal = ({ isOpen, onClose, onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please fill in all required fields.");
      return;
    }
    const userData = {
      name: isRegister ? (formData.name || "Pet Lover") : formData.email.split("@")[0],
      email: formData.email,
    };
    onLogin(userData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={onClose} 
          style={{ position: "absolute", top: "1.2rem", right: "1.2rem", background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }}
        >
          <X size={20} />
        </button>

        <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", fontWeight: "700" }}>
          {isRegister ? "Create an Account" : "Welcome Back"}
        </h2>
        <p style={{ color: "#94a3b8", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
          {isRegister ? "Join PetShop to track orders and save your details." : "Sign in to your PetShop account."}
        </p>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="form-group">
              <label><UserIcon size={14} style={{ display: "inline", marginRight: "4px" }} /> Full Name</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="John Doe" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          )}

          <div className="form-group">
            <label><Mail size={14} style={{ display: "inline", marginRight: "4px" }} /> Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="user@example.com" 
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label><Lock size={14} style={{ display: "inline", marginRight: "4px" }} /> Password</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••" 
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "1rem", padding: "0.85rem" }}>
            {isRegister ? "Create Account" : "Sign In"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.9rem", color: "#94a3b8" }}>
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button 
            type="button"
            onClick={() => setIsRegister(!isRegister)} 
            style={{ background: "none", border: "none", color: "#f59e0b", fontWeight: "600", cursor: "pointer", textDecoration: "underline" }}
          >
            {isRegister ? "Sign In" : "Register now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
"""

checkout_modal = """import { useState } from "react";
import { X, CreditCard, ShieldCheck, CheckCircle2 } from "lucide-react";
import api from "../api";

const CheckoutModal = ({ isOpen, onClose, cart, clearCart, user }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderPayload = {
        customerName: formData.name || "Guest Customer",
        items: cart.map(item => ({ name: item.name, price: item.price, quantity: 1 })),
        totalAmount: parseFloat(totalAmount),
      };

      await api.post("/api/orders", orderPayload);
      setLoading(false);
      setStep(2);
      clearCart();
    } catch (err) {
      console.error("Order payment error:", err);
      setLoading(false);
      setStep(2);
      clearCart();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "520px" }}>
        <button 
          onClick={onClose} 
          style={{ position: "absolute", top: "1.2rem", right: "1.2rem", background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }}
        >
          <X size={20} />
        </button>

        {step === 1 ? (
          <>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", fontWeight: "700" }}>
              Checkout & Payment
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
              Complete your order for <strong style={{ color: "#f59e0b" }}>Rs. {totalAmount}</strong> ({cart.length} items)
            </p>

            <form onSubmit={handlePay}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label>Customer Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    required 
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    required 
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Shipping Address</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required 
                  placeholder="123 Main Street, City"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1rem", marginTop: "1rem" }}>
                <h4 style={{ fontSize: "1.1rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CreditCard size={18} color="#f59e0b" /> Payment Details
                </h4>

                <div className="form-group">
                  <label>Card Number</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    required 
                    maxLength="19"
                    placeholder="4532 •••• •••• 8892"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="form-group">
                    <label>Expiry (MM/YY)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      required 
                      maxLength="5"
                      placeholder="12/28"
                      value={formData.expiry}
                      onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>CVC</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      required 
                      maxLength="4"
                      placeholder="882"
                      value={formData.cvc}
                      onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                disabled={loading}
                style={{ width: "100%", justifyContent: "center", marginTop: "1.5rem", padding: "0.9rem" }}
              >
                {loading ? "Processing Payment..." : `Pay Rs. ${totalAmount}`}
              </button>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "1rem", color: "#94a3b8", fontSize: "0.85rem" }}>
                <ShieldCheck size={16} color="#10b981" /> 256-bit Encrypted SSL Payment
              </div>
            </form>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <CheckCircle2 size={64} color="#10b981" style={{ margin: "0 auto 1.5rem" }} />
            <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Order Confirmed!</h2>
            <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
              Thank you, <strong>{formData.name}</strong>! Your payment was successful and your pet treats are on the way.
            </p>
            <button className="btn-primary" onClick={onClose} style={{ margin: "0 auto" }}>
              Back to Store
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
"""

navbar = """import { Link } from 'react-router-dom';
import { ShoppingCart, PawPrint, User, LogOut } from 'lucide-react';

const Navbar = ({ cartCount, user, onOpenAuth, onLogout }) => {
  return (
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f8fafc' }}>
        <PawPrint size={32} color="#f59e0b" />
        <span style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.5px' }}>Pet<span style={{ color: '#f59e0b' }}>Shop</span></span>
      </Link>
      
      <div className="nav-links">
        <Link to="/category/food">Food</Link>
        <Link to="/category/toys">Toys</Link>
        <Link to="/category/equipment">Equipment</Link>
        <Link to="/category/cosmetics">Cosmetics</Link>
        
        <Link to="/cart" className="btn-primary" style={{ padding: '0.5rem 1rem' }}>
          <ShoppingCart size={18} /> Cart ({cartCount})
        </Link>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.08)', padding: '0.4rem 0.8rem', borderRadius: '10px' }}>
            <User size={16} color="#f59e0b" />
            <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{user.name}</span>
            <button onClick={onLogout} title="Logout" style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button onClick={onOpenAuth} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
            <User size={16} /> Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
"""

cart_page = """import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartPage = ({ cart, clearCart, onOpenCheckout }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  if (cart.length === 0) {
    return (
      <div style={{ padding: '4rem 1rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <ShoppingBag size={64} color="#f59e0b" style={{ margin: '0 auto 1.5rem' }} />
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Your Cart is Empty</h2>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Looks like you haven't added any pet goodies yet.</p>
        <Link to="/" className="btn-primary">Explore Products</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2.2rem', marginBottom: '2rem', borderBottom: '3px solid #f59e0b', display: 'inline-block' }}>
        Shopping Cart
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        {cart.map((item, idx) => (
          <div key={idx} style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
              {item.image && (
                <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
              )}
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{item.name}</h4>
                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Category: {item.category}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f59e0b' }}>Rs. {item.price}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: '#1e293b', padding: '1.8rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ color: '#94a3b8', fontSize: '1rem' }}>Total Amount:</span>
          <h3 style={{ fontSize: '2.2rem', color: '#f59e0b', fontWeight: '800' }}>Rs. {total}</h3>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={clearCart} className="btn-secondary" style={{ color: '#ef4444' }}>
            <Trash2 size={18} /> Clear Cart
          </button>
          <button onClick={onOpenCheckout} className="btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '1.1rem' }}>
            Proceed to Payment <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
"""

app_page = """import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import AuthModal from './components/AuthModal';
import CheckoutModal from './components/CheckoutModal';

function HomePage() {
  const categories = [
    { name: 'food', title: 'Nutritious Food', img: 'https://images.pexels.com/photos/5749774/pexels-photo-5749774.jpeg?auto=compress&cs=tinysrgb&w=500' },
    { name: 'toys', title: 'Fun & Chewy Toys', img: 'https://images.pexels.com/photos/3663082/pexels-photo-3663082.jpeg?auto=compress&cs=tinysrgb&w=500' },
    { name: 'equipment', title: 'Gear & Equipment', img: 'https://images.pexels.com/photos/7310226/pexels-photo-7310226.jpeg?auto=compress&cs=tinysrgb&w=500' },
    { name: 'cosmetics', title: 'Grooming & Care', img: 'https://images.pexels.com/photos/6816858/pexels-photo-6816858.jpeg?auto=compress&cs=tinysrgb&w=500' },
  ];

  return (
    <div style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', margin: '2rem 0 4rem' }}>
        <span style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Premium Pet Supplies ??
        </span>
        <h1 style={{ fontSize: '3.5rem', margin: '1rem 0', fontWeight: '800', lineHeight: '1.2' }}>
          Spoil Your <span style={{ color: '#f59e0b' }}>Best Friend</span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.25rem', maxWidth: '650px', margin: '0 auto 2rem' }}>
          Explore our collection of premium toys, organic food, and top-tier pet accessories.
        </p>
      </div>

      <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#f8fafc', fontWeight: '700' }}>Explore Categories</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {categories.map(c => (
          <Link key={c.name} to={'/category/' + c.name} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="product-card" style={{ padding: 0, overflow: 'hidden', height: '100%' }}>
              <div style={{ height: '170px', overflow: 'hidden', backgroundColor: '#334155' }}>
                <img src={c.img} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '1.2rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>{c.title}</h3>
                <span style={{ color: '#f59e0b', fontSize: '0.9rem', fontWeight: '600', marginTop: '0.5rem', display: 'inline-block' }}>Shop Now &rarr;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('petshop_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('petshop_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('petshop_user');
  };

  const addToCart = (product) => setCart([...cart, product]);
  const clearCart = () => setCart([]);

  return (
    <BrowserRouter>
      <Navbar 
        cartCount={cart.length} 
        user={user} 
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryName" element={<CategoryPage addToCart={addToCart} />} />
        <Route 
          path="/cart" 
          element={
            <CartPage 
              cart={cart} 
              clearCart={clearCart} 
              onOpenCheckout={() => {
                if (!user) {
                  setIsAuthOpen(true);
                } else {
                  setIsCheckoutOpen(true);
                }
              }} 
            />
          } 
        />
      </Routes>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLogin={handleLogin} 
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        cart={cart} 
        clearCart={clearCart} 
        user={user} 
      />
    </BrowserRouter>
  );
}

export default App;
"""

with open("d:/Pet Shop/frontend/src/components/AuthModal.jsx", "w", encoding="utf-8") as f:
    f.write(auth_modal)

with open("d:/Pet Shop/frontend/src/components/CheckoutModal.jsx", "w", encoding="utf-8") as f:
    f.write(checkout_modal)

with open("d:/Pet Shop/frontend/src/components/Navbar.jsx", "w", encoding="utf-8") as f:
    f.write(navbar)

with open("d:/Pet Shop/frontend/src/pages/CartPage.jsx", "w", encoding="utf-8") as f:
    f.write(cart_page)

with open("d:/Pet Shop/frontend/src/App.jsx", "w", encoding="utf-8") as f:
    f.write(app_page)

print("All UI components generated successfully!")
