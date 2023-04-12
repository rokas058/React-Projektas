import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const columns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Pavadinimas",
    accessor: "pavadinimas",
  },
  {
    Header: "Kategorija",
    accessor: "kategorija",
  },
  {
    Header: "Išmatavimai",
    accessor: "ismatavimai",
  },
  {
    Header: "Kūrėjas",
    accessor: "kurejas",
  },
  {
    Header: "Kaina",
    accessor: "kaina",
  },
  {
    Header: "Foto įkėlimas",
    accessor: (product) => (
      <img
        src={`data:image/jpeg;base64,${product.photo}`}
        alt="Product"
        style={{ height: "50px" }}
      />
    ),
  },
];

export default function Product() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/product")
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
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Button>
            <Link to="/admin/product/ProductTable" className="nav-link">
              Create
            </Link>
          </Button>
          <Button>
            <Link to="/admin/product/ProductForm" className="nav-link">
              Create
            </Link>
          </Button>

          <Button>
            <Link to="/admin" className="nav-link">
              Back
            </Link>
          </Button>
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
  );
}
