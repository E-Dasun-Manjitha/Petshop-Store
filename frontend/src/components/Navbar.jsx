import { Link } from "react-router-dom";
import { ShoppingCart, PawPrint, User, LogOut } from "lucide-react";

const Navbar = ({ cartCount, user, onOpenAuth, onLogout }) => {
  return (
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem", color: "#f8fafc" }}>
        <PawPrint size={32} color="#f59e0b" />
        <span style={{ fontSize: "1.5rem", fontWeight: "800", letterSpacing: "-0.5px" }}>Pet<span style={{ color: "#f59e0b" }}>Shop</span></span>
      </Link>
      
      <div className="nav-links">
        <Link to="/category/food">Food</Link>
        <Link to="/category/toys">Toys</Link>
        <Link to="/category/equipment">Equipment</Link>
        <Link to="/category/cosmetics">Cosmetics</Link>
        
        <Link to="/cart" className="btn-primary" style={{ padding: "0.5rem 1rem" }}>
          <ShoppingCart size={18} /> Cart ({cartCount})
        </Link>

        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "rgba(255,255,255,0.08)", padding: "0.4rem 0.8rem", borderRadius: "10px" }}>
            <User size={16} color="#f59e0b" />
            <span style={{ fontWeight: "600", fontSize: "0.95rem" }}>{user.name}</span>
            <button onClick={onLogout} title="Logout" style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center" }}>
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button onClick={onOpenAuth} className="btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}>
            <User size={16} /> Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
