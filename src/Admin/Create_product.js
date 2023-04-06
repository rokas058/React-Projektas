import React from "react";
import { Link } from "react-router-dom";

const Create_product = () => {
  return (
    <div>
      <h1>Sukurti produkta</h1>
      <p>
        Siame puslapyje kuriame naujus produktus. Ikeliame juos.{" "}
        <li>1. pavadinimas</li>
        <li>2. kategorija </li>
        <li>3. ismatavimai</li>
        <li>4. autorius </li>
        <li>5. kaina </li>
        <li>6. ikelti nuotrauka</li>
      </p>
      <ul>
        <tr>
          <button>
            <Link to="/admin/product" className="nav-link">
              Back
            </Link>
          </button>
        </tr>
      </ul>
    </div>
  );
};

export default Create_product;
