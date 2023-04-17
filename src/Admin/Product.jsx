import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import axios from "axios";
import Button from "react-bootstrap/Button";
import '../Admin/styles.css'

export default function Product() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

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

  const handleDelete = useCallback((id) => {
    axios
      .delete(`http://localhost:8080/admin/product/${id}`)
      .then((response) => {
        setData((prevData) =>
          prevData.filter((product) => product.id !== id)
        );
        navigate("/admin/product");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }, [navigate]);

  const handleEdit = useCallback(
    (id) => {
      navigate(`/admin/product/edit/${id}`);
    },
    [navigate]
  );

  const columns = useMemo(
    () => [
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
        Header: "Nuotrauka",
        accessor: (product) => (
          <img
            src={`data:image/jpeg;base64,${product.photo}`}
            alt="Product"
            style={{ width: "100px", height: "100px", objectFit: "cover"}}
          />
        ),
      },
      {
        Header: "",
        id: "edit",
        Cell: ({ row }) => (
          <Button variant="warning" onClick={() => handleEdit(row.original.id)}>
            Koreguoti
          </Button>
        ),
        disableSortBy: true,
      },
      {
        Header: "",
        id: "delete",
        Cell: ({ row }) => (
          <Button
            variant="danger"
            onClick={() => handleDelete(row.original.id)}
          >
            Ištrinti
          </Button>
        ),
        disableSortBy: true,
      },
    ],
    [handleDelete, handleEdit]
  );

  const tableInstance = useTable({
    columns,
    data: useMemo(() => data, [data]),
  });

  const { getTableProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
            <a href="/admin/product/ProductForm" className="sukurti-mygtukas" >
              Pridėti
            </a>
        </div>
      </div>
      <table {...getTableProps()} style={{ width: "100%" }}>
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
        <tbody>
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
  );
}

