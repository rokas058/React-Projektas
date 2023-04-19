import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './STYLES/paveikslas.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ShoppingCartContext } from '../components/ShoppingCartContext';

const Paveikslas = () => {
  const [paveikslas, setPaveikslas] = useState({});
  const { id } = useParams();
  const { addToCart } = useContext(ShoppingCartContext);

  useEffect(() => {
    const fetchPaveikslas = async () => {
      const res = await axios.get(`http://localhost:8080/${id}`);
      setPaveikslas(res.data);
    };
    fetchPaveikslas();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(paveikslas);
  };

  return (
    <div className="paveikslas-container">
      <img src={`data:image/jpeg;base64,${paveikslas.photo}`} alt={paveikslas.pavadinimas}
        className="paveikslas-img" />
      <h2>{paveikslas.pavadinimas}</h2>
      <div className="paveikslas-info">
        <p>Kūrėjas: {paveikslas.kurejas}</p>
        <p>Išmatavimai: {paveikslas.ismatavimai}</p>
        <p>Kaina: {paveikslas.kaina} €</p>
        <p>Aprašymas: {paveikslas.aprasymas}</p>
      </div>
      <button className="cart-button" onClick={handleAddToCart}>
        <FontAwesomeIcon icon={faShoppingCart} />
      </button>
    </div>
  );
};

export default Paveikslas;
