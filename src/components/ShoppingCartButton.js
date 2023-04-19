import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ShoppingCartButton = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  return (
    <div>
      <Link to="/cart" className="shopping-cart-btn">
        <FontAwesomeIcon icon={faShoppingCart} />
      </Link>
      {cartItems.map((item, index) => (
        <div key={index}>{item.pavadinimas}</div>
      ))}
    </div>
  );
};

export default ShoppingCartButton;
