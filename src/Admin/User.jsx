import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useTable } from "react-table";

import { useNavigate } from "react-router-dom";
// import "../Admin/styles.css";

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
        // Header: "Leisti/Neleisti",
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
        // Header: "Taisyti",
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
        // Header: "Delete",
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
const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <>
      <div class="container">
  <div class="row">
    <div class="col-md-12"></div>
  </div>
  <div class="row">
    <div class="col-md-12"></div>
    <table cellpadding="10" cellspacing="10">
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
    <br />
    <br />
  </div>
</div>
    </>
  );
}
