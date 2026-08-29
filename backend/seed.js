const mongoose = require("mongoose");
const Product = require("./src/models/Product");
require("dotenv").config();

const products = [
  { name: "Premium Dog Kibble", description: "High protein dog food for adult dogs.", price: 45.99, category: "food", image: "https://images.pexels.com/photos/5749774/pexels-photo-5749774.jpeg?auto=compress&cs=tinysrgb&w=500", inStock: true },
  { name: "Organic Cat Food", description: "Grain-free organic salmon for cats.", price: 32.50, category: "food", image: "https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=500", inStock: true },
  { name: "Squeaky Rubber Bone", description: "Durable rubber toy for heavy chewers.", price: 12.99, category: "toys", image: "https://images.pexels.com/photos/3663082/pexels-photo-3663082.jpeg?auto=compress&cs=tinysrgb&w=500", inStock: true },
  { name: "Cat Feather Wand", description: "Interactive toy for endless feline fun.", price: 8.50, category: "toys", image: "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=500", inStock: true },
  { name: "Leather Dog Collar", description: "Premium leather collar with brass buckle.", price: 24.99, category: "equipment", image: "https://images.pexels.com/photos/7310226/pexels-photo-7310226.jpeg?auto=compress&cs=tinysrgb&w=500", inStock: true },
  { name: "Cozy Pet Bed", description: "Soft, plush bed for small to medium pets.", price: 55.00, category: "equipment", image: "https://images.pexels.com/photos/4587971/pexels-photo-4587971.jpeg?auto=compress&cs=tinysrgb&w=500", inStock: true },
  { name: "Oatmeal Pet Shampoo", description: "Soothing shampoo for sensitive skin.", price: 15.75, category: "cosmetics", image: "https://images.pexels.com/photos/6816858/pexels-photo-6816858.jpeg?auto=compress&cs=tinysrgb&w=500", inStock: true },
  { name: "Healing Paw Balm", description: "Moisturizes and protects cracked paws.", price: 9.99, category: "cosmetics", image: "https://images.pexels.com/photos/7210748/pexels-photo-7210748.jpeg?auto=compress&cs=tinysrgb&w=500", inStock: true }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to DB");
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Database seeded successfully!");
    process.exit(0);
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });
