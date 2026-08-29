const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{ name: String, price: Number }],
  totalAmount: Number,
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
