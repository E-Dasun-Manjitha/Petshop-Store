import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";

function HomePage() {
  const categories = [
    { name: "food", title: "Nutritious Food", img: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&q=80" },
    { name: "toys", title: "Fun & Chewy Toys", img: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&q=80" },
    { name: "equipment", title: "Gear & Equipment", img: "https://images.unsplash.com/photo-1601334810842-167858c8ecb5?w=500&q=80" },
    { name: "cosmetics", title: "Grooming & Care", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&q=80" },
  ];

  return (
    <div style={{ padding: "2rem 1rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", margin: "2rem 0 4rem" }}>
        <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem", fontWeight: "800" }}>
          Spoil Your <span style={{ color: "var(--accent)" }}>Best Friend</span>
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.25rem", maxWidth: "650px", margin: "0 auto" }}>
          Explore our collection of premium toys, organic food, and top-tier pet accessories.
        </p>
      </div>

      <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem", color: "var(--text-main)" }}>Explore Categories</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
        {categories.map(c => (
          <Link key={c.name} to={"/category/" + c.name} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="product-card" style={{ padding: 0, overflow: "hidden", height: "100%" }}>
              <div style={{ height: "160px", overflow: "hidden", backgroundColor: "#334155" }}>
                <img src={c.img} alt={c.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "1.2rem", textAlign: "center" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: "600" }}>{c.title}</h3>
                <span style={{ color: "var(--accent)", fontSize: "0.9rem", fontWeight: "600", marginTop: "0.5rem", display: "inline-block" }}>Shop Now &rarr;</span>
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
  const addToCart = (product) => setCart([...cart, product]);
  const clearCart = () => setCart([]);

  return (
    <BrowserRouter>
      <Navbar cartCount={cart.length} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryName" element={<CategoryPage addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} clearCart={clearCart} />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
