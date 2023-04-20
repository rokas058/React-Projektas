import React, { useEffect, useState } from "react";
import axios from "axios";
import PaginationBar from "../components/PaginationBar";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import "./STYLES/categoryPage.css";

const CategoryPage = ({ category, coverImage, apiUrl }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(apiUrl);
      setProducts(res.data);
    };
    fetchProducts();
  }, [apiUrl]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="cover">
        <img src={coverImage} alt={category} />
        <h1>{category}</h1>
      </div>
  
      <div className="main-container">
        <div className="container">
          {currentProducts.map((product) => (
            <div key={product.id} className="card-container col-md">
              <Link to={`/${product.id}`} className="link">
                <Card
                  pavadinimas={product.pavadinimas}
                  photo={product.photo}
                  kategorija={product.kategorija}
                  ismatavimai={product.ismatavimai}
                  kurejas={product.kurejas}
                  kaina={product.kaina}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
  
      {products.length > productsPerPage && (
        <PaginationBar
          productsPerPage={productsPerPage}
          totalProducts={products.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </>
  );
  
};

export default CategoryPage;
