import { useState } from 'react';
import { Navbar, Nav, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function NavigationBar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);

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
          
          <Button
            variant="primary"
            onClick={handleShowLoginModal}
            className="login-button"
          >
            Log in
          </Button>

          <Button
            variant="light"
            className="shopping-cart-button mr-2"
          >
            <FontAwesomeIcon icon={faShoppingCart} />
          </Button>

        </Nav>
      </Navbar.Collapse>
      <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
        <Modal.Header closeButton>
          <Modal.Title>Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Log in
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Navbar>
  );
}

export default NavigationBar;
