import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./LoginModal.css";

function LoginModal(props) {
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSwitchForm = () => {
    setShowRegister(!showRegister);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (showRegister) {
      handleRegister(e);
    } else {
      handleLogin(e);
    }
  };

  const handleLogin = async (e) => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        props.onLogin(data.accessToken);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        props.onHide();
        navigate("/");
      } else {
        alert("Prisijungti nepavyko");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (e) => {
    try {
      setMessage("Check your email for confirmation.");
      setShowMessage(true);
      setTimeout(() => {
        handleSwitchForm();
        setShowMessage(false);
      }, 3000);

      const response = await fetch("http://localhost:8080/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{showRegister ? "Register" : "Log In"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!showMessage ? (
          <Form onSubmit={handleSubmit}>
            {showRegister && (
              <>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your first name"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your last name"
                    onChange={handleChange}
                  />
                </Form.Group>
              </>
            )}
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                required
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <div className="password-container">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={handlePasswordToggle}
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    className="password-toggle-icon"
                  />
                </button>
              </div>
            </Form.Group>
            <Button variant="primary" type="submit">
              {showRegister ? "Register" : "Log In"}
            </Button>
            {showRegister ? (
              <p className="switch-form-text">
                Already have an account?{" "}
                <button
                  type="button"
                  className="switch-form-btn"
                  onClick={handleSwitchForm}
                >
                  Log In
                </button>
              </p>
            ) : (
              <p className="switch-form-text">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="switch-form-btn"
                  onClick={handleSwitchForm}
                >
                  Register
                </button>
              </p>
            )}
          </Form>
        ) : (
          <Alert variant="success">{message}</Alert>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
