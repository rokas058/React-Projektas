import React from 'react';
import { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';


function NavigationBar() {
  const [showLogin, setShowLogin] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(true);
  }

  const handleHideLogin = () => {
    setShowLogin(false);
  }

  return (
    <Navbar bg="light" expand="lg">
      <Link to="/" className="navbar-brand">
        MENAS
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/paveikslai" className="nav-link">
            Paveikslai
          </Link>
          <Link to="/fotografija" className="nav-link">
            Fotografija
          </Link>
          <Link to="/skulpturos" className="nav-link">
            Skulptūros
          </Link>
          <Link to="/keramika" className="nav-link">
            Keramika
          </Link>
        </Nav>
        <Nav className="ml-auto">
          
        <Button className='login-btn' variant="primary" onClick={handleShowLogin}>Log In</Button>

          <Button variant="light" className="shopping-cart-btn"
          >
            <FontAwesomeIcon icon={faShoppingCart} />
          </Button>

        </Nav>
      </Navbar.Collapse>

      <LoginModal show={showLogin} onHide={handleHideLogin} />

    </Navbar>
  );
}

export default NavigationBar;
