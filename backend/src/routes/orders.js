const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ success: true, orderId: order._id });
  } catch (error) {
    res.status(400).json({ message: 'Invalid order data' });
  }
});

module.exports = router;
