import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditProductForm from "./EditProductForm";

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `http://localhost:8080/admin/product/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleEditSubmit = async (formData) => {
    const token = localStorage.getItem("accessToken");
    try {
      await axios.put(`http://localhost:8080/admin/product/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Product updated successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to update product");
    }
  };

  return (
    <div>
      {product ? (
        <EditProductForm product={product} onSubmit={handleEditSubmit} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditProduct;
