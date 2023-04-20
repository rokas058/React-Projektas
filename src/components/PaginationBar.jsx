import React from "react";
import { Pagination } from "react-bootstrap";
import "./PaginationBar.css";

const PaginationBar = ({
  productsPerPage, // Updated prop name
  totalProducts, // Updated prop name
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-bar">
      <Pagination>
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        />
        {pageNumbers.map((number) => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => paginate(number)}
          >
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Next
          disabled={currentPage === Math.ceil(totalProducts / productsPerPage)}
          onClick={() => paginate(currentPage + 1)}
        />
      </Pagination>
    </div>
  );
};

export default PaginationBar;
