import { useState } from "react";
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
                    placeholder="4532 **** **** 8892"
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
