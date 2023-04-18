import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RedirectMessage from "../components/RedirectMessage";

function useAuth() {
    const [showModal, setShowModal] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      async function validateAdmin() {
        const token = localStorage.getItem('accessToken');
  
        if (!token) {
          setShowModal(true);
          return;
        }
  
        const api = axios.create({
          baseURL: 'http://localhost:8080',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        try {
          await Promise.all([
            api.get('/admin/product'),
            api.get('/admin/user'),
            // Add more admin endpoints here if needed
          ]);
          setIsAdmin(true); // Set the user as an admin
        } catch (error) {
          if (
            error.response &&
            (error.response.status === 403 || error.response.status === 500)
          ) {
            setShowModal(true);
          }
        }
      }
  
      validateAdmin();
    }, [navigate]);
  
    const handleCloseModal = () => {
      setShowModal(false);
      navigate('/'); // Redirect to the home page
    };
  
    return isAdmin ? null : (
      <RedirectMessage
        show={showModal}
        onHide={handleCloseModal}
        countdownDuration={3000}
      />
    );
  }
  
  export default useAuth;

