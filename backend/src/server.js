require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'PetShop API is running 🐾' });
});

// Root
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to PetShop API',
    endpoints: {
      health: '/api/health',
      products: '/api/products (coming soon)',
      categories: '/api/categories (coming soon)',
      orders: '/api/orders (coming soon)',
    },
  });
});

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

// TODO: Nimsara will add more routes here on feature branches
// app.use('/api/categories', categoryRoutes);

app.listen(PORT, () => {
  console.log(`🐾 PetShop API server running on port ${PORT}`);
});
