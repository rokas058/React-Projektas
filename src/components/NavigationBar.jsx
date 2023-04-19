import React, { useState, useEffect, useContext } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import { ShoppingCartContext } from "./ShoppingCartContext";
import "./NavigationBar.css";


function NavigationBar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cartItems } = useContext(ShoppingCartContext);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleShowLoginModal = () => {
    setShowLoginModal(true);
  };

  const handleHideLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleLogin = (accessToken) => {
    setIsLoggedIn(true);
    localStorage.setItem("accessToken", accessToken);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("accessToken");
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
            <>
            <Link to="/shopping-cart">
              <Button variant="light" className="shopping-cart-btn">
                <FontAwesomeIcon icon={faShoppingCart} />
                {cartItems.length > 0 && (
                  <span className="cart-items-count">{cartItems.length}</span>
                )}
              </Button>
            </Link>
              <Link to="/paskyra" className="nav-link">
                Paskyra
              </Link>
              <Button variant="secondary" onClick={handleLogout}>
                Log Out
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={handleShowLoginModal}>
              Log In
            </Button>
          )}
          <LoginModal
            show={showLoginModal}
            onHide={handleHideLoginModal}
            onLogin={handleLogin}
          />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
