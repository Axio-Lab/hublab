"use client";
import React from 'react';

const ProductPage = () => {
  // Hardcoded product details
  const product = {
    name: 'Social Media Mastery for Web3 Businessess',
    owner: 'Axio Labs',
    description: 'This is a great product that offers many excellent features and benefits. It\'s perfect for anyone looking for quality and reliability.',
    price: 99.99,
    image: 'data:image/png;base64,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',
    quantity: 'unlimited',
  };

  const handleBuyNow = () => {
    alert('Product added to cart!');
  };

  return (
    <div className="container">
      <div className="product-image">
        <img src={product.image} alt="Product Image" />
      </div>
      <div className="product-details">
        <h1>{product.name}</h1>
        <p>by {product.owner}</p>
        <p className="description">{product.description}</p>
        <p className="price">${product.price.toFixed(2)}</p>
        <p>Quantity: {product.quantity}</p>
        <button className="buy-now-button" onClick={handleBuyNow}>Buy Now</button>
        <p className="cashback-tag">{'NOTE: 1000 BONK cashback on every $1 spent in BONK'}</p>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          padding: 20px;
        }
        .product-image {
          max-width: 400px;
          margin-right: 20px;
        }
        .product-details {
          max-width: 600px;
        }
        .product-details h1 {
          font-size: 24px;
          margin: 10px 0;
        }
        .product-details p {
          margin: 5px 0;
        }
        .price {
          font-size: 24px;
          color: #007bff;
          margin: 10px 0;
        }
        .buy-now-button {
          background-color: #28a745;
          color: white;
          padding: 10px 20px;
          border: none;
          cursor: pointer;
          font-size: 16px;
        }
        .cashback-tag {
          margin-top: 10px;
          font-size: 14px;
          color: #ff225c;
        }
      `}</style>
    </div>
  );
};

export default ProductPage;