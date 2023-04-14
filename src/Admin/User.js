import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTable } from "react-table";
import { NavLink } from "react-router-dom";
import "../Admin/styles.css";

const columns = [
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
];

export default function Product() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/user")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
        </div>
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
