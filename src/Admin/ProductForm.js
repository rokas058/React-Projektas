import React, { useState } from "react";
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

const ProductForm = () => {
  const [product, setProduct] = useState({
    pavadinimas: "",
    kategorija: "",
    ismatavimai: "",
    kurejas: "",
    kaina: "",
    photo: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setProduct({ ...product, [name]: files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => {
      formData.append(key, value);
    });

    await axios.post("http://localhost:8080/admin/product", formData);
    alert("Sėkmingai įkelta");
  };

  return (
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
              <MenuItem value="PAVEIKSLAI">PAVEIKSLAI</MenuItem>
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
          <input
            name="photo"
            type="file"
            onChange={handleFileChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Prideti meno kurini
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            component={Link}
            to="/admin/product"
            variant="outlined"
            color="primary"
          >
            Back
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;
