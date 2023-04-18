import React, { useState, useEffect } from "react";

const Purchase = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch("http://localhost:8080/admin/purchase", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setPurchases(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const acceptPurchase = async (id) => {
    const token = localStorage.getItem("accessToken");

    try {
      await fetch(`http://localhost:8080/admin/purchase/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      setPurchases(purchases.filter((purchase) => purchase.id !== id));
    } catch (error) {
      console.error("Error accepting purchase:", error);
    }
  };

  return (
    <div>
      <h1>Purchases</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Product IDs</th>
            <th>Purchase Confirm</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase.id}>
              <td>{purchase.id}</td>
              <td>{purchase.userId}</td>
              <td>{purchase.userFirstName}</td>
              <td>{purchase.userLastName}</td>
              <td>{purchase.userEmail}</td>
              <td>{purchase.productsId.join(", ")}</td>
              <td>{purchase.purchaseConfirm ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => acceptPurchase(purchase.id)}>
                  Accept
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Purchase;
