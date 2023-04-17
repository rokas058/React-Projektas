// Forma skirta ikelto produkto informacijos redagavimui
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const EditProductForm = ({ product: initialProduct, onSubmit, mode }) => {
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
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
    }
  }, [initialProduct]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = async (event) => {
    const { name, files } = event.target;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const byteArray = new Uint8Array(reader.result);
        setProduct({ ...product, [name]: Array.from(byteArray) });
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (onSubmit) {
      onSubmit(product);
    } else {
      await axios.put(`http://localhost:8080/product/${product.id}`, product);
      alert("Product updated successfully");
    }
  };

  return (
    <>
    <h1 style={{ textAlign: "center", fontWeight: "bold", marginTop: "40px", marginBottom: "-20px"}}>Koreguoti produkta</h1>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh", marginTop: "10px" }}>
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
          <button className="foto-mygtukas" size="large" onClick={() => fileInputRef.current.click()}>
            Pakeisti nuotrauka
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
          <button className="sukurti-mygtukas">
            Išsaugoti pakeitimus
          </button>
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

export default EditProductForm;
