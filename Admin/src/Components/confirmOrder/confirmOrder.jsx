import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './confirmOrder.css'; // Impor file CSS

const API_URL = "http://localhost:3000"; // Sesuaikan dengan URL backend Anda

const ConfirmOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/orders`);
      console.log('Fetched Orders:', response.data); // Log data orders
      setOrders(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError('Error fetching orders: ' + (error.response?.data.message || error.message));
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await axios.put(`${API_URL}/api/orders/${orderId}/status`, { status });
      console.log('Updated Order:', response.data); // Log updated order
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === orderId ? response.data : order))
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError('Error updating order status: ' + (error.response?.data.message || error.message));
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (orders.length === 0) return <p>No orders found</p>;

  return (
    <div className="confirmorder-container">
      {orders.map((order) => (
        <div key={order._id} className="confirmorder-item">
          <div className="confirmorder-details">
            <p>Order ID: {order._id}</p>
            <p>User ID: {order.userId}</p>
            <p>Total: ${order.total}</p>
            <p>Expedition: {order.expedition}</p>
            <p>Status: {order.status}</p>
          </div>
          <div className="confirmorder-items">
            <h2>Items:</h2>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.quantity} pcs
                </li>
              ))}
            </ul>
          </div>
          {order.status === 'Menunggu Konfirmasi' && (
            <button className="confirm-button" onClick={() => updateOrderStatus(order._id, 'Confirmed')}>
              Confirm Order
            </button>
          )}
          {order.status === 'Confirmed' && (
            <button className="confirm-button" onClick={() => updateOrderStatus(order._id, 'Shipped')}>
              Pesanan Siap Dikirim
            </button>
          )}
          {order.status === 'Shipped' && (
            <button className="confirm-button" onClick={() => updateOrderStatus(order._id, 'Delivered')}>
              Pesanan Selesai
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ConfirmOrder;
