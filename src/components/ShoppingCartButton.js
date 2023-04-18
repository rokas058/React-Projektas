import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ShoppingCartButton = () => {
  return (
    <Button variant="light" className="shopping-cart-btn">
      <FontAwesomeIcon icon={faShoppingCart} />
    </Button>
  );
};

export default ShoppingCartButton;
