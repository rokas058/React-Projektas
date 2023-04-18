import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";

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
    <div style={{ marginLeft: "15%", marginRight: "15%" }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-center">ID</th>
            <th className="text-center">Varotojo ID</th>
            <th className="text-center">Vardas</th>
            <th className="text-center">Pavardė</th>
            <th className="text-center">E.paštas</th>
            <th className="text-center">Produkto IDs</th>
            <th className="text-center">Statusas</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase.id}>
              <td className="text-center">{purchase.id}</td>
              <td className="text-center">{purchase.userId}</td>
              <td className="text-center">{purchase.userFirstName}</td>
              <td className="text-center">{purchase.userLastName}</td>
              <td className="text-center">{purchase.userEmail}</td>
              <td className="text-center">{purchase.productsId.join(", ")}</td>
              <td className="text-center">
                < Button variant="success" onClick={() => acceptPurchase(purchase.id)}>
                  Patvirtinti
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Purchase;

