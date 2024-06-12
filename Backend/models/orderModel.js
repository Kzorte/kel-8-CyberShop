// models/orderModel.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  expedition: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Menunggu Konfirmasi', 'Confirmed', 'Shipped', 'Delivered'],
    default: 'Menunggu Konfirmasi',
  },
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
