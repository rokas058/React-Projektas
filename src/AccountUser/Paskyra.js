import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Paskyra() {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("User not logged in");
      }

      const response = await fetch("http://localhost:8080/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUserInfo(data);
      console.log("User data:", data);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };
  const handlePasswordChange = () => {
    navigate("/password-change");
  };

  return (
    <div>
      <h1>Paskyra</h1>
      <p>Vardas: {userInfo.firstName}</p>
      <p>Pavardė: {userInfo.lastName}</p>
      <p>El. paštas: {userInfo.email}</p>
      <button onClick={handlePasswordChange}>Change Password</button>
    </div>
  );
}

export default Paskyra;
