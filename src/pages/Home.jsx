import React from 'react';
import { Link } from 'react-router-dom';
import './STYLES/home.css';
import homePageCover from '../pages/images/homePage-cover.jpg';

function Home() {
  return (
    <div className="home">
      <img src={homePageCover} alt="Home page cover" />
      <div className="home__overlay">
        <h1>VIRTUALI GALERIJA</h1>
        <p>Atrask įdomiausius meno kūrinius.</p>
        <div className="home__buttons">
          <Link to="/paveikslai">
            <button>PAVEIKSLAI</button>
          </Link>
          <Link to="/fotografija">
            <button>FOTOGRAFIJA</button>
          </Link>
          <Link to="/skulpturos">
            <button>SKULPTŪROS</button>
          </Link>
          <Link to="/keramika">
            <button>KERAMIKA</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
