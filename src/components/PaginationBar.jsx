import React from "react";
import { Pagination } from "react-bootstrap";
import "./PaginationBar.css";

const PaginationBar = ({
  paveikslaiPerPage,
  totalPaveikslai,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPaveikslai / paveikslaiPerPage); i++) {
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
          disabled={
            currentPage === Math.ceil(totalPaveikslai / paveikslaiPerPage)
          }
          onClick={() => paginate(currentPage + 1)}
        />
      </Pagination>
    </div>
  );
};

export default PaginationBar;
