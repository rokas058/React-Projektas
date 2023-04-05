import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PaveikslaiCardData from './PaveikslaiCardData';
import Card from '../components/Card';
import PaginationBar from '../components/PaginationBar';
import paveikslaiCover from '../pages/images/paveikslai-cover.jpg';
import './Paveikslai.css';

const Paveikslai = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(18);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = PaveikslaiCardData.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="cover">
        <img src={paveikslaiCover} alt="Paveikslai" />
        <h1>PAVEIKSLAI</h1>
      </div>
      <Container>
        <Row xs={1} sm={2} md={3} lg={4}>
          {currentCards.map((card) => (
            <Col key={card.id}>
              <Card {...card} />
            </Col>
          ))}
        </Row>
      </Container>
      <PaginationBar
        cardsPerPage={cardsPerPage}
        totalCards={PaveikslaiCardData.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
};

export default Paveikslai;
