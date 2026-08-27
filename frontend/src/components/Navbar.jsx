import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, PawPrint } from 'lucide-react';

const Navbar = ({ cartCount }) => (
  <nav className="navbar">
    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', textDecoration: 'none', fontSize: '1.5rem', fontWeight: '800' }}>
      <PawPrint size={32} /> PetShop
    </Link>
    
    <div className="nav-links">
      <Link to="/category/food">Food</Link>
      <Link to="/category/toys">Toys</Link>
      <Link to="/category/equipment">Equipment</Link>
      <Link to="/category/cosmetics">Cosmetics</Link>
      <Link to="/cart" className="btn-primary">
        <ShoppingCart size={20} />
        Cart ({cartCount})
      </Link>
    </div>
    
    <button className="mobile-menu-btn"><Menu size={28} /></button>
  </nav>
);
export default Navbar;
