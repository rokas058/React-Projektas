import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useTable } from "react-table";
import { useNavigate } from "react-router-dom";
import "../Admin/styles.css";
import useAuth from "./useAuth";
import { Pagination } from "react-bootstrap";

export default function User() {
  const authModal = useAuth();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = localStorage.getItem("accessToken");
    axios
      .get("http://localhost:8080/admin/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(25);

  const handleDelete = (id) => {
    const token = localStorage.getItem("accessToken");
    axios
      .delete(`http://localhost:8080/admin/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        fetchData();
        const lastPage = Math.ceil(data.length / itemsPerPage);
        if (currentPage > lastPage) {
          setCurrentPage(lastPage);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleToggleEnabled = (id) => {
    const token = localStorage.getItem("accessToken");
    axios
      .put(`http://localhost:8080/admin/user/enable/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Vardas",
        accessor: "firstName",
      },
      {
        Header: "Pavardė",
        accessor: "lastName",
      },
      {
        Header: "El. paštas",
        accessor: "email",
      },

      {
        id: "leisti-neleisti",
        Cell: ({ row }) => (
          <button
            style={{ width: "100px" }}
            className={`btn ${
              row.original.enabled ? "btn-success" : "btn-warning"
            }`}
            onClick={() => {
              handleToggleEnabled(row.original.id, !row.original.enabled);
            }}
          >
            {row.original.enabled ? "Aktyvus" : "Neaktyvus"}
          </button>
        ),
      },

      {
        id: "taisyti",
        Cell: ({ row }) => (
          <button
            style={{ width: "100px" }}
            className="btn btn-info"
            onClick={() => {
              navigate(`/admin/user/edit/${row.original.id}`);
            }}
          >
            Koreguoti
          </button>
        ),
      },

      {
        id: "delete",
        Cell: ({ row }) => (
          <button
            style={{ width: "100px" }}
            className="btn btn-danger"
            onClick={() => {
              handleDelete(row.original.id);
            }}
          >
            Ištrinti
          </button>
        ),
      },
    ],
    [navigate]
  );

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{ margin: "0 10%", display: "flex", justifyContent: "center" }}
      >
        <table {...getTableProps()} className="table table-striped">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} style={{ width: "200px" }}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "3%" }}
      >
        <Pagination>
          <Pagination.Prev
            onClick={() => {
              setCurrentPage((prevPage) => prevPage - 1);
            }}
            disabled={currentPage === 1}
          />
          {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map(
            (number) => (
              <Pagination.Item
                key={number}
                active={number + 1 === currentPage}
                onClick={() => {
                  setCurrentPage(number + 1);
                }}
              >
                {number + 1}
              </Pagination.Item>
            )
          )}
          <Pagination.Next
            onClick={() => {
              setCurrentPage((prevPage) => prevPage + 1);
            }}
            disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
          />
        </Pagination>
      </div>
    </div>
  );
}
