import React from 'react'
import { Link } from "react-router-dom";
import '../Admin/styles.css'
import bay from '../Admin/photos/buy-icon.webp'
import User from '../Admin/photos/user.png'
import product from '../Admin/photos/product.png'
import untitled from '../Admin/photos/admin.png'
import art from '../Admin/photos/art.png'

const AdminNavigationBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/admin" className="admin-tools-link">
              <img src={untitled} alt="user-foto-admin" className="user-photo"/>
              Administratorius
            </Link>
        </li>
        <li className="navbar-item">
          <Link to="/admin/user" className="admin-tools-link">
              <img src={User} alt="user-foto" className="user-photo"/>
              Vartotojai
            </Link>
        </li>
        <li className="navbar-item">
          <Link to="/admin/product" className="admin-tools-link">
              <img src={product} alt="user-foto" className="user-photo"/>
              Produktai
            </Link>
        </li>
        <li className="navbar-item">
          <Link to="/admin/test" className="admin-tools-link">
              <img src={bay} alt="user-foto" className="user-photo"/>
              Pirkimai
            </Link>
        </li>
        <li className="menas-mygtukas">
          <Link to="/" className="navbar-link">
            <img src={art} alt="user-foto-admin" className="user-photo"/>
            Menas
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default AdminNavigationBar
