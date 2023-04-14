import React, { useState, useEffect } from 'react';
import LoginModal from './LoginModal';

function LoginButton() {
  const [showModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  const handleLogin = async (formData) => {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      localStorage.setItem('accessToken', data.accessToken);
      setIsAuthenticated(true);
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('accessToken');
    setLoginSuccess(false);
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          {loginSuccess ? (
            <div className="success-message">You have successfully logged in!</div>
          ) : (
            <button onClick={handleShowModal}>Log in</button>
          )}
          <button onClick={handleLogout}>Log out</button>
        </div>
      ) : (
        <>
          <button onClick={handleShowModal}>Log in</button>
          <LoginModal show={showModal} onHide={handleHideModal} onLogin={handleLogin} />
        </>
      )}
    </div>
  );
}

export default LoginButton;
