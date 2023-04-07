import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './LoginModal.css';

function LoginModal(props) {
  const [showRegister, setShowRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSwitchForm = () => {
    setShowRegister(!showRegister);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle login logic and submit form data to backend
  }

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{showRegister ? 'Register' : 'Log In'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {showRegister && (
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your last name" />
            </Form.Group>
          )}
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your first name" />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <div className="password-container">
              <Form.Control type={showPassword ? "text" : "password"} placeholder="Password" required />
              <button type="button" className="password-toggle-btn" onClick={handlePasswordToggle}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </Form.Group>
          <Button variant="primary" type="submit">
            {showRegister ? 'Register' : 'Log In'}
          </Button>
          <Button variant="link" onClick={handleSwitchForm}>
            {showRegister ? 'Already have an account? Log in here.' : "Don't have an account? Register."}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
