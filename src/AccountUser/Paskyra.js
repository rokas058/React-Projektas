import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";

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
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };
  const handlePasswordChange = () => {
    navigate("/password-change");
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
    <div
      style={{
        marginLeft: "15%",
        marginRight: "15%",
        maxWidth: "70%",
        textAlign: "left",
      }}
    >
      <h1 style={{ marginTop: "60px", marginBottom: "20px" }}>
        {" "}
        Labas {userInfo.firstName} , sveikas sugrįžęs!
      </h1>

      <h3 style={{ marginTop: "80px", marginBottom: "20px" }}>
        {" "}
        Tavo anketos duomenys:
      </h3>
      <Table striped bordered hover style={{ marginBottom: "30px" }}>
        <tbody>
          <tr>
            <th>Vardas</th>
            <td>{userInfo.firstName}</td>
          </tr>
          <tr>
            <th>Pavardė</th>
            <td>{userInfo.lastName}</td>
          </tr>
          <tr>
            <th>El. paštas</th>
            <td>{userInfo.email}</td>
          </tr>
          <tr>
            <th style={{ verticalAlign: "middle" }}>Slaptažodžio keitimas</th>

            <td>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Button variant="btn btn-danger" onClick={handlePasswordChange}>
                  Keisti slaptažodį
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Paskyra;
