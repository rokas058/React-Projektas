import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const ProductForm = ({ product: initialProduct, onSubmit, mode }) => {
  const [product, setProduct] = useState(
    initialProduct || {
      pavadinimas: "",
      kategorija: "",
      ismatavimai: "",
      kurejas: "",
      kaina: "",
      photo: "",
    }
  );
  const resetForm = () => {
    setProduct({
      pavadinimas: "",
      kategorija: "",
      ismatavimai: "",
      kurejas: "",
      kaina: "",
      photo: "",
    });
  };
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
    }
  }, [initialProduct]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setProduct({ ...product, [name]: files[0], photoName: files[0].name });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const accessToken = localStorage.getItem("accessToken");
    if (onSubmit) {
      onSubmit(formData);
    } else {
      await axios.post("http://localhost:8080/admin/product", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      alert("Sėkmingai įkelta");
      resetForm(); // Reset the form fields
      navigate("/admin/product/ProductForm", { replace: true }); // Reload the ProductForm page
    }
  };

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          fontWeight: "bold",
          marginTop: "40px",
          marginBottom: "-20px",
        }}
      >
        Pridėti produkta
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          marginLeft: "25%",
          marginRight: "25%",
          marginTop: "0",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="pavadinimas"
                label="Pavadinimas"
                value={product.pavadinimas}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="kategorija-label">Kategorija</InputLabel>
                <Select
                  labelId="kategorija-label"
                  name="kategorija"
                  value={product.kategorija}
                  onChange={handleChange}
                >
                  <MenuItem value="PAVEIKSLAS">PAVEIKSLAS</MenuItem>
                  <MenuItem value="FOTOGRAFIJA">FOTOGRAFIJA</MenuItem>
                  <MenuItem value="SKULPTURA">SKULPTURA</MenuItem>
                  <MenuItem value="KERAMIKA">KERAMIKA</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="ismatavimai"
                label="Išmatavimai"
                value={product.ismatavimai}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="kurejas"
                label="Kūrėjas"
                value={product.kurejas}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="kaina"
                label="Kaina"
                value={product.kaina}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <button
                className="foto-mygtukas"
                size="large"
                onClick={() => {
                  fileInputRef.current.click();
                }}
              >
                {product.photoName
                  ? `Jūsų įkelta foto pavadinimu: ${product.photoName}`
                  : "Pridėti nuotrauka - ne didesne kaip 10 MB"}
                <input
                  ref={fileInputRef}
                  id="photo"
                  name="photo"
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </button>
            </Grid>

            <Grid item xs={12}>
              <button className="sukurti-mygtukas">Pridėti produkta</button>
            </Grid>
            <Button className="atgal-mygtukas">
              <Link to="/admin/product" className="atgal-mygtukas">
                Atgal
              </Link>
            </Button>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default ProductForm;
