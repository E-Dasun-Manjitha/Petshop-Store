import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Plus, ShoppingBag, Utensils, Smile, Shield, Sparkles } from "lucide-react";
import api from "../api";

const getCategoryIcon = (category, size = 48) => {
  switch (category) {
    case "food": return <Utensils size={size} color="#f59e0b" />;
    case "toys": return <Smile size={size} color="#f59e0b" />;
    case "equipment": return <Shield size={size} color="#f59e0b" />;
    case "cosmetics": return <Sparkles size={size} color="#f59e0b" />;
    default: return <ShoppingBag size={size} color="#f59e0b" />;
  }
};

const defaultCategoryImages = {
  food: "https://images.pexels.com/photos/5749774/pexels-photo-5749774.jpeg?auto=compress&cs=tinysrgb&w=500",
  toys: "https://images.pexels.com/photos/3663082/pexels-photo-3663082.jpeg?auto=compress&cs=tinysrgb&w=500",
  equipment: "https://images.pexels.com/photos/7310226/pexels-photo-7310226.jpeg?auto=compress&cs=tinysrgb&w=500",
  cosmetics: "https://images.pexels.com/photos/6816858/pexels-photo-6816858.jpeg?auto=compress&cs=tinysrgb&w=500",
};

const CategoryPage = ({ addToCart }) => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    api.get("/api/products?category=" + categoryName)
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products", err));
  }, [categoryName]);

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ textTransform: "capitalize", fontSize: "2.2rem", marginBottom: "2rem", borderBottom: "3px solid var(--accent)", display: "inline-block", paddingBottom: "0.3rem" }}>
        {categoryName}
      </h2>
      <div className="grid-layout" style={{ padding: 0 }}>
        {products.length === 0 ? (
          <p style={{ color: "var(--text-muted)" }}>No products found in this category.</p>
        ) : products.map(p => {
          const displayImage = p.image || defaultCategoryImages[categoryName] || defaultCategoryImages.food;

          return (
            <div key={p._id} className="product-card" style={{ overflow: "hidden", padding: 0, display: "flex", flexDirection: "column" }}>
              <div style={{ width: "100%", height: "200px", overflow: "hidden", backgroundColor: "#1e293b", position: "relative" }}>
                <img 
                  src={displayImage} 
                  alt={p.name} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div style={{ display: "none", width: "100%", height: "100%", backgroundColor: "#334155", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "0.5rem" }}>
                  {getCategoryIcon(categoryName)}
                  <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>{p.name}</span>
                </div>
              </div>
              
              <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3 style={{ fontSize: "1.3rem", marginBottom: "0.5rem", fontWeight: "700" }}>{p.name}</h3>
                <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", flex: 1, fontSize: "0.95rem", lineHeight: "1.4" }}>{p.description}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                  <span style={{ fontSize: "1.3rem", fontWeight: "bold", color: "var(--accent)" }}>Rs. {p.price}</span>
                  <button className="btn-primary" onClick={() => addToCart(p)}><Plus size={18}/> Add</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CategoryPage;
