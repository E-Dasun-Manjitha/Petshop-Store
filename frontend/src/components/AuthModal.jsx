import { useState } from "react";
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
              placeholder="********" 
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
