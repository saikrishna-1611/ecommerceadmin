// src/components/Products.js
import React, { useEffect, useState } from 'react';
import { getProducts, createOrder } from '../api';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleOrder = async (id, quantity) => {
    try {
      await createOrder(id, quantity);
      alert('Order created');
    } catch (error) {
      alert('Order failed: ' + error.response.data.message);
    }
  };

  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          <button onClick={() => handleOrder(product._id, 1)}>Order</button>
        </div>
      ))}
    </div>
  );
};

export default Products;