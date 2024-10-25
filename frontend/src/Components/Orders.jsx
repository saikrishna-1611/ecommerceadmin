// src/components/Orders.js
import React, { useEffect, useState } from 'react';
import { getUserOrders } from '../api';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await getUserOrders();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      {orders.map((order) => (
        <div key={order._id}>
          <h4>Order ID: {order._id}</h4>
          <p>Total Amount: {order.totalAmount}</p>
          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Orders;