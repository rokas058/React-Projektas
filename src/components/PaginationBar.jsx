import React, { useState } from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationBar = ({ itemsPerPage, totalItems, paginate }) => {
  const [active, setActive] = useState(1);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (number) => {
    setActive(number);
    paginate(number);
  };

  return (
    <Pagination>
      {pageNumbers.map((number) => (
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={() => handleClick(number)}
        >
          {number}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default PaginationBar;
