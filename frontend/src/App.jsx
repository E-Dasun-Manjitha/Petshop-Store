import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import AuthModal from "./components/AuthModal";
import CheckoutModal from "./components/CheckoutModal";

function HomePage() {
  const categories = [
    { name: "food", title: "Nutritious Food", img: "https://images.pexels.com/photos/5749774/pexels-photo-5749774.jpeg?auto=compress&cs=tinysrgb&w=500" },
    { name: "toys", title: "Fun & Chewy Toys", img: "https://images.pexels.com/photos/3663082/pexels-photo-3663082.jpeg?auto=compress&cs=tinysrgb&w=500" },
    { name: "equipment", title: "Gear & Equipment", img: "https://images.pexels.com/photos/7310226/pexels-photo-7310226.jpeg?auto=compress&cs=tinysrgb&w=500" },
    { name: "cosmetics", title: "Grooming & Care", img: "https://images.pexels.com/photos/6816858/pexels-photo-6816858.jpeg?auto=compress&cs=tinysrgb&w=500" },
  ];

  return (
    <div style={{ padding: "2rem 1rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", margin: "2rem 0 4rem" }}>
        <span style={{ background: "rgba(245, 158, 11, 0.15)", color: "#f59e0b", padding: "0.4rem 1rem", borderRadius: "20px", fontSize: "0.9rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>
          Premium Pet Supplies ??
        </span>
        <h1 style={{ fontSize: "3.5rem", margin: "1rem 0", fontWeight: "800", lineHeight: "1.2" }}>
          Spoil Your <span style={{ color: "#f59e0b" }}>Best Friend</span>
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "1.25rem", maxWidth: "650px", margin: "0 auto 2rem" }}>
          Explore our collection of premium toys, organic food, and top-tier pet accessories.
        </p>
      </div>

      <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem", color: "#f8fafc", fontWeight: "700" }}>Explore Categories</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
        {categories.map(c => (
          <Link key={c.name} to={"/category/" + c.name} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="product-card" style={{ padding: 0, overflow: "hidden", height: "100%" }}>
              <div style={{ height: "170px", overflow: "hidden", backgroundColor: "#334155" }}>
                <img src={c.img} alt={c.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "1.2rem", textAlign: "center" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: "600" }}>{c.title}</h3>
                <span style={{ color: "#f59e0b", fontSize: "0.9rem", fontWeight: "600", marginTop: "0.5rem", display: "inline-block" }}>Shop Now &rarr;</span>
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
    const savedUser = localStorage.getItem("petshop_user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("petshop_user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("petshop_user");
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
