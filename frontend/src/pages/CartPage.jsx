import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CartPage = ({ cart, clearCart, onOpenCheckout }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  if (cart.length === 0) {
    return (
      <div style={{ padding: "4rem 1rem", textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
        <ShoppingBag size={64} color="#f59e0b" style={{ margin: "0 auto 1.5rem" }} />
        <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Your Cart is Empty</h2>
        <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>Looks like you haven't added any pet goodies yet.</p>
        <Link to="/" className="btn-primary">Explore Products</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "2.2rem", marginBottom: "2rem", borderBottom: "3px solid #f59e0b", display: "inline-block" }}>
        Shopping Cart
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
        {cart.map((item, idx) => (
          <div key={idx} style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "1.2rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
              {item.image && (
                <img src={item.image} alt={item.name} style={{ width: "60px", height: "60px", borderRadius: "8px", objectFit: "cover" }} />
              )}
              <div>
                <h4 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>{item.name}</h4>
                <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Category: {item.category}</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
              <span style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#f59e0b" }}>Rs. {item.price}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "#1e293b", padding: "1.8rem", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <span style={{ color: "#94a3b8", fontSize: "1rem" }}>Total Amount:</span>
          <h3 style={{ fontSize: "2.2rem", color: "#f59e0b", fontWeight: "800" }}>Rs. {total}</h3>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={clearCart} className="btn-secondary" style={{ color: "#ef4444" }}>
            <Trash2 size={18} /> Clear Cart
          </button>
          <button onClick={onOpenCheckout} className="btn-primary" style={{ padding: "0.9rem 2rem", fontSize: "1.1rem" }}>
            Proceed to Payment <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
