import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PasswordChange() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Pakartotas slaptažodis nesutampa.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Vartotojas neprisijunges");
      }

      const response = await fetch("http://localhost:8080/user/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: currentPassword,
          newPassword: newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Slaptažodžio pakeisti nepavyko");
      }

      alert("Slaptažodis sėkmingai pakeistas");
    } catch (error) {
      console.error("Slaptažodžio keitimo klaida:", error.message);
    }
  };
  const handleBackClick = () => {
    navigate("/paskyra");
  };
  useEffect(() => {
    // Set grey background color on the body element when the component mounts
    document.body.style.backgroundColor = "rgb(246, 246, 246)";

    // Revert the background color when the component is unmounted
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);
  return (
    <div className="container mt-3">
      <h1>Slaptažodžio keitimas</h1>
      <br />
      <form action="/action_page.php" onSubmit={handleChangePassword}>
        <div className="form-floating mb-3 mt-3">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Iveskite slaptazodi"
            name="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <label>Dabartinis slaptažodis:</label>
        </div>
        <br />

        <div className="form-floating mb-3 mt-3">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Naujas slaptažodis"
            name="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <label>Naujas slaptažodis:</label>
        </div>

        <br />

        <div className="form-floating mb-3 mt-3">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Pakartoti slaptažodį"
            name="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label>Pakartoti slaptažodį:</label>
        </div>

        <br />
        <button
          type="submit"
          className="btn btn-success"
          style={{ width: "200px" }}
        >
          Keisti slaptažodį
        </button>
        <br />
        <br />
        <button
          type="button"
          className="btn btn-secondary"
          style={{ width: "200px" }}
          onClick={handleBackClick}
        >
          Atgal į paskyra
        </button>
      </form>
    </div>
  );
}

export default PasswordChange;
