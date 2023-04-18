import React, { useState, useEffect } from "react";
import UserEditForm from "./UserEditForm";
import axios from "axios";
import { useParams } from "react-router-dom";

function UserEdit({ onUserUpdated }) {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(id);
  }, [id]);

  const fetchUser = (userId) => {
    const token = localStorage.getItem("accessToken");
    axios
      .get(`http://localhost:8080/admin/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateUser = (updatedUser) => {
    const token = localStorage.getItem("accessToken");
    axios
      .put(`http://localhost:8080/admin/user/${id}`, updatedUser, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        onUserUpdated(); // Refresh the user list
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{ marginLeft: '25%', marginRight: '25%', marginTop: '50px'}}>
      {user ? (
        <UserEditForm user={user} onUpdateUser={updateUser} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default UserEdit;
