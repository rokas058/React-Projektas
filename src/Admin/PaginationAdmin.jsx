import React, { useState } from "react";
import { Pagination } from "react-bootstrap";

const PaginationAdmin = () => {
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const pages = [];
  for (let i = 1; i <= 5; i++) {
    pages.push(
      <Pagination.Item
        key={i}
        active={i === activePage}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <Pagination>
      <Pagination.Prev />
      {pages}
      <Pagination.Next />
    </Pagination>
  );
};

export default PaginationAdmin;