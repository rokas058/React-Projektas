import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Test = () => {
  return (
    <div>
      <h1>Test peidzas</h1>
      <p>Testuojam</p>
      <ul>
        <li>
          <button>
            <Link to="/admin" className="nav-link">
              Back
            </Link>
          </button>
        </li>

        <li>
          <button>
            <Link to="/admin/product/create_product" className="nav-link">
              Create
            </Link>
          </button>
        </li>

        <tr>
          <Button>
            <Link to="/admin/product" className="nav-link">
              Back
            </Link>
          </Button>
        </tr>
      </ul>
      <i class="fa fa-gear"></i>
    </div>
  );
};

export default Test;
