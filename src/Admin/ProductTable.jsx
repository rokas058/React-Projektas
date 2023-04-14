// import React, { useState, useEffect } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import axios from "axios";

// const ProductTable = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     const response = await axios.get("http://localhost:8080/admin/product");
//     setProducts(response.data);
//   };

//   const columns = [
//     { field: "id", headerName: "ID", width: 90 },
//     { field: "pavadinimas", headerName: "Pavadinimas", width: 200 },
//     { field: "kategorija", headerName: "Kategorija", width: 200 },
//     { field: "ismatavimai", headerName: "Išmatavimai", width: 200 },
//     { field: "kurejas", headerName: "Kūrėjas", width: 200 },
//     { field: "kaina", headerName: "Kaina", width: 200 },
//     { field: "photo", headerName: "Foto įkėlimas", width: 200 },
//   ];

//   return (
//     <div style={{ height: 400, width: "100%" }}>
//       <DataGrid rows={products} columns={columns} pageSize={5} />
//     </div>
//   );
// };

// export default ProductTable;
