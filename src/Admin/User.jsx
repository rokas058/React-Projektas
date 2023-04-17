import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useTable } from "react-table";

import { NavLink, useNavigate } from "react-router-dom";
import "../Admin/styles.css";

export default function User() {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:8080/admin/user")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/admin/user/${id}`)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleToggleEnabled = (id) => {
    // Use the correct API endpoint for enabling/disabling users
    axios
      .put(`http://localhost:8080/admin/user/enable/${id}`)
      .then((response) => {
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
        Header: "Edit",
        id: "edit",
        Cell: ({ row }) => (
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate(`/admin/user/edit/${row.original.id}`);
            }}
          >
            Edit
          </button>
        ),
      },
      {
        Header: "Enable/Disable",
        id: "enable-disable",
        Cell: ({ row }) => (
          <button
            className={`btn ${
              row.original.enabled ? "btn-warning" : "btn-success"
            }`}
            onClick={() => {
              handleToggleEnabled(row.original.id, !row.original.enabled);
            }}
          >
            {row.original.enabled ? "Disable" : "Enable"}
          </button>
        ),
      },

      {
        Header: "Delete",
        id: "delete",
        Cell: ({ row }) => (
          <button
            className="btn btn-danger"
            onClick={() => {
              handleDelete(row.original.id);
            }}
          >
            Delete
          </button>
        ),
      },
    ],
    [navigate]
  );

 const tableInstance = useTable({ columns, data });
const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12"></div>
        </div>
        <div className="row">
          <div className="col-md-12"></div>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
