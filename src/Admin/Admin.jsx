import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/Admin/user" className="nav-link">
            User
          </Link>
        </li>
        <li>
          <Link to="/Admin/product" className="nav-link">
            Product
          </Link>
        </li>
        <li>
          <Link to="/Admin/test" className="nav-link">
            Test
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Admin;
