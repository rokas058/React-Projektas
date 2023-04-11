import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './STYLES/paveikslas.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Paveikslas = () => {
  const [paveikslas, setPaveikslas] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchPaveikslas = async () => {
      const res = await axios.get(`http://localhost:8080/${id}`);
      setPaveikslas(res.data);
    };
    fetchPaveikslas();
  }, [id]);

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
      <button className="cart-button">
        <FontAwesomeIcon icon={faShoppingCart} />
      </button>
    </div>
  );
};

export default Paveikslas;
