import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import "../Admin/styles.css";
import useAuth from "./useAuth";

const accessToken = localStorage.getItem("accessToken");

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export default function Product() {
  const authModal = useAuth();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get("http://localhost:8080/admin/product", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = useCallback(
    (id) => {
      const token = localStorage.getItem("accessToken");
      axios
        .delete(`http://localhost:8080/admin/product/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
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
    },
    [navigate]
  );

  const handleEdit = useCallback(
    (id) => {
      navigate(`/admin/product/edit/${id}`);
    },
    [navigate]
  );

  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  const productsPerPage = 20;
  const offset = (currentPage - 1) * productsPerPage;
  const paginatedData = useMemo(
    () => data.slice(offset, offset + productsPerPage),
    [data, offset, productsPerPage]
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
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        ),
      },
      {
        Header: "",
        id: "edit",
        Cell: ({ row }) => (
          <Button variant="info" onClick={() => handleEdit(row.original.id)}>
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: paginatedData,
    });

  return (
    <div>
      <a
        href="/admin/product/ProductForm"
        className="sukurti-mygtukas-produktu"
      >
        Pridėti
      </a>
      {authModal}
      <div
        className="table-container"
        style={{ margin: "0 10%", display: "flex", justifyContent: "center" }}
      >
        <div style={{ margin: "0 auto" }}>
          <table {...getTableProps()} style={{ borderSpacing: "10px" }}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} style={{ width: "140px" }}>
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
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "3%" }}
      >
        <Pagination className="pagination">
          {Array.from({ length: Math.ceil(data.length / productsPerPage) }).map(
            (_, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>
      </div>
    </div>
  );
}
