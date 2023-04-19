import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ShoppingCartContext } from "../components/ShoppingCartContext";
import "./STYLES/shoppingCartPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import axios from "axios"; 


const ShoppingCartPage = () => {

    const { cartItems, removeFromCart } = useContext(ShoppingCartContext);

    const handleRemoveItem = (id) => {
        removeFromCart(id);
      };

      
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
      
    const handleCheckout = async () => {
        try {
          const accessToken = localStorage.getItem('accessToken');
          const items = cartItems.map(item => ({ id: item.id }));
      
          const response = await axios.post(
            'http://localhost:8080/purchase',
            { products: items },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
              },
            }
          );
          localStorage.removeItem("cartItems");
          console.log(response.data);
          navigate('/payments');
        } catch (error) {
          console.error(error);
          setErrorMessage("Something went wrong, please try again.");
        }
      };
            

  return (
    <div className="shopping-cart-page">
      <h2>Your Shopping Cart</h2>

      {errorMessage && (
        <div className="error-message">
            <p>{errorMessage}</p>
        </div>
        )}

      <div className="cart-items-container">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image">
              <img
                src={`data:image/jpeg;base64,${item.photo}`}
                alt={item.pavadinimas}
              />
            </div>
            <div className="cart-item-details">
              <h3>{item.pavadinimas}</h3>
              <p>{item.kaina} €</p>
            </div>
            <div className="cart-item-delete">
              <button
                className="delete-button"
                onClick={() => handleRemoveItem(item.id)}
              >
                <FontAwesomeIcon icon={faTimesCircle} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Cart Summary</h3>
        <p>
          Subtotal:{" "}
          {cartItems.reduce((total, item) => total + item.kaina, 0)} €
        </p>
    
        <button className="checkout-button" onClick={handleCheckout}>
             Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
