import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PaginationBar from '../components/PaginationBar';
import Card from '../components/Card';
import './STYLES/paveikslai.css';
import paveikslaiCover from '../pages/images/paveikslai-cover.jpg';
import { Link } from 'react-router-dom';

const Paveikslai = () => {
  const [paveikslai, setPaveikslai] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paveikslaiPerPage] = useState(6);

  useEffect(() => {
    const fetchPaveikslai = async () => {
      const res = await axios.get('http://localhost:8080/paveikslai');
      setPaveikslai(res.data);
    };
    fetchPaveikslai();
  }, []);

  const indexOfLastPaveikslas = currentPage * paveikslaiPerPage;
  const indexOfFirstPaveikslas = indexOfLastPaveikslas - paveikslaiPerPage;
  const currentPaveikslai = paveikslai.slice(indexOfFirstPaveikslas, indexOfLastPaveikslas);

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
        <img src={paveikslaiCover} alt="Paveikslai" />
        <h1>PAVEIKSLAI</h1>
      </div>

      <div className="paveikslai-container">
        {currentPaveikslai.map((paveikslas) => (
          <div key={paveikslas.id} className={`card-container col-md-${12 / columns}`}>
            <Link to={`/${paveikslas.id}`} className="link">
              <Card
                pavadinimas={paveikslas.pavadinimas}
                photo={paveikslas.photo}
                kategorija={paveikslas.kategorija}
                ismatavimai={paveikslas.ismatavimai}
                kurejas={paveikslas.kurejas}
                kaina={paveikslas.kaina}
                aprasymas={paveikslas.aprasymas}
              />
            </Link>
          </div>
        ))}
      </div>

      {paveikslai.length > paveikslaiPerPage && (
        <PaginationBar
          paveikslaiPerPage={paveikslaiPerPage}
          totalPaveikslai={paveikslai.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default Paveikslai;
