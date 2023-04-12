import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './LoginModal.css';

function LoginModal(props) {
  const [showRegister, setShowRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleSwitchForm = () => {
    setShowRegister(!showRegister);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data);
      // handle response data as needed
    } catch (error) {
      console.error(error);
      // handle error as needed
    }
  }

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
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
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your last name" onChange={handleChange} />
            </Form.Group>
          )}
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your first name" onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <div className="password-container">
              <Form.Control type={showPassword ? "text" : "password"} placeholder="Password" required onChange={handleChange} />
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
