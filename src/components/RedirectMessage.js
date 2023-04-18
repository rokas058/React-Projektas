import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import "./redirectMessage.css";

function RedirectMessage({ show, onHide, countdownDuration }) {
    const [remainingTime, setRemainingTime] = useState(countdownDuration);
    const navigate = useNavigate();
  
    useEffect(() => {
      const timer = setTimeout(() => {
        if (remainingTime > 0) {
          setRemainingTime(remainingTime - 1000);
        } else {
          onHide();
          navigate('/'); // Redirect to the home page
        }
      }, 1000);
  
      return () => clearTimeout(timer);
    }, [remainingTime, onHide, navigate]);
  
    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>You are not authorized</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You will be redirected in {remainingTime / 1000} seconds</p>
        </Modal.Body>
      </Modal>
    );
  }

export default RedirectMessage;
