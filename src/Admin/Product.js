import React from "react";
import { Link } from "react-router-dom";

const Product = () => {
  return (
    <div>
      <h1>Product peidzas</h1>
      <p>
        1.Siame puslapyje turi buti produktu sarasas, su funkciniais mygtukais
        redaguoti ir istrinti. 2.Turi buti nuoroda i "create product"
      </p>
      <ul>
        <li>
          <button>
            <Link to="/admin/product/create_product" className="nav-link">
              Create product
            </Link>
          </button>
        </li>
        <li>
          <button>
            <Link to="/admin" className="nav-link">
              Back
            </Link>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Product;
