import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Plus, Package } from "lucide-react";
import api from "../api";

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
        ) : products.map(p => (
          <div key={p._id} className="product-card" style={{ overflow: "hidden", padding: 0 }}>
            <div style={{ width: "100%", height: "200px", overflow: "hidden", backgroundColor: "#334155", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              {p.image ? (
                <img 
                  src={p.image} 
                  alt={p.name} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  onError={(e) => { 
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : null}
              <div style={{ display: p.image ? "none" : "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)" }}>
                <Package size={40} color="var(--accent)" />
                <span style={{ fontSize: "0.85rem" }}>{p.name}</span>
              </div>
            </div>
            <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>{p.name}</h3>
              <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", flex: 1, fontSize: "0.95rem", lineHeight: "1.4" }}>{p.description}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                <span style={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--accent)" }}>Rs. {p.price}</span>
                <button className="btn-primary" onClick={() => addToCart(p)}><Plus size={18}/> Add</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CategoryPage;
