import React, { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';

function NavigationBar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleShowLoginModal = () => {
    setShowLoginModal(true);
  };

  const handleHideLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleLogin = (accessToken) => {
    setIsLoggedIn(true);
    localStorage.setItem('accessToken', accessToken);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('accessToken');
  };

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
          {isLoggedIn ? (
            <Button variant="secondary" onClick={handleLogout}>
              Log Out
            </Button>
          ) : (
            <Button variant="primary" onClick={handleShowLoginModal}>
              Log In
            </Button>
          )}
          <LoginModal show={showLoginModal} onHide={handleHideLoginModal} onLogin={handleLogin} />
          <Button variant="light" className="shopping-cart-btn">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
