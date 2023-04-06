import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const User = () => {
  const styles = {
    backgroundColor: "lightblue",
    padding: "20px",
    textAlign: "center",
    fontFamily: "Arial",
    fontSize: "24px",
  };

  return (
    <div>
      <p>
        <tr>
          Siame puslapyje turi buti Useriu sarasas, su funkciniais mygtukais
          redaguoti ir istrinti.
        </tr>
        <tr>Useris atkeliauja is registracijos peidzo:</tr>
        <li>1. vardas</li>
        <li>2. pavarde </li>
        <li>3. el. pastas</li>
      </p>
      <ul>
        <tr>
          <Button>
            <Link to="/admin" className="nav-link">
              Back
            </Link>
          </Button>
        </tr>
      </ul>
      <h1>User peidzas</h1>
      <p>Cia userio puslapis.</p>
      <nav style={styles} className="table">
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr>
          <tr>
            <td>Mary</td>
            <td>Moe</td>
            <td>mary@example.com</td>
          </tr>
          <tr>
            <td>July</td>
            <td>Dooley</td>
            <td>july@example.com</td>
          </tr>
          <tr>
            <td>July1</td>
            <td>Dooley1</td>
            <td>july1@example.com</td>
          </tr>
        </tbody>
      </nav>
    </div>
  );
};

export default User;
