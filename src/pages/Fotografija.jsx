import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PaginationBar from '../components/PaginationBar';
import Card from '../components/Card';
import paveikslaiCover from '../pages/images/fotografija-cover.jpg';
import { Link } from 'react-router-dom';
import './STYLES/paveikslai.css';


const Fotografija = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get('http://localhost:8080/fotografijos');
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const columns = getColumns();

  function getColumns() {
    const width = window.innerWidth;
    if (width > 1200) return 4;
    if (width > 992) return 3;
    if (width > 768) return 2;
    return 1;
  }

  return (
    <>
      <div className="cover">
        <img src={paveikslaiCover} alt="Fotografija" />
        <h1>Fotografija</h1>
      </div>

      <div className="container">
        <div className="row">
          {currentProducts.map((product) => (
            <div key={product.id} className={`card-container col-md-${12 / columns}`}>
              <Link to={`/${product.id}`} className="link">
                <Card
                  pavadinimas={product.pavadinimas}
                  photo={product.photo}
                  kategorija={product.kategorija}
                  ismatavimai={product.ismatavimai}
                  kurejas={product.kurejas}
                  kaina={product.kaina}
                  aprasymas={product.aprasymas}
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

export default Fotografija;
