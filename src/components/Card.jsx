import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './card.css';



const Card = ({ id, pavadinimas, photo, kategorija, ismatavimai, kurejas, kaina }) => {
  

  return (
    <div className="card">
      <img src={`data:image/jpeg;base64,${photo}`} className="card-img-top" alt={pavadinimas} />
      <div className="card-body">
        <h5 className="card-title">{pavadinimas}</h5>
        <p className="card-author">Autorius: {kurejas}</p>
        <p className="card-price">€{kaina}</p>
        <button className="card-cart">
          <FontAwesomeIcon icon={faShoppingCart} />
        </button>
      </div>
    </div>
  );
};

export default Card;
