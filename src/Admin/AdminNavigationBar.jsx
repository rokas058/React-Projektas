import React from 'react'
import { Link } from "react-router-dom";
import '../Admin/styles.css'
import bay from '../Admin/photos/buy-icon.webp'
import User from '../Admin/photos/user.png'
import product from '../Admin/photos/product.png'
import untitled from '../Admin/photos/admin.png'
import art from '../Admin/photos/art.png'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const AdminNavigationBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="secondary" variant="dark">
      <Container>
        <Navbar.Brand href="#">
          <Link to="/admin" className="admin-tools-link me-auto">
            <img src={untitled} alt="user-foto-admin" className="user-photo"/>
            Administratorius
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">
              <Link to="/admin/user" className="admin-tools-link">
                <img src={User} alt="user-foto" className="user-photo"/>
                Vartotojai
              </Link>
            </Nav.Link>
            <Nav.Link href="#">
              <Link to="/admin/product" className="admin-tools-link">
                <img src={product} alt="user-foto" className="user-photo"/>
                Produktai
              </Link>
            </Nav.Link>
            <Nav.Link href="#">
              <Link to="/admin/test" className="admin-tools-link">
                <img src={bay} alt="user-foto" className="user-photo"/>
                Pirkimai
              </Link>
            </Nav.Link>
          </Nav>
          <Nav.Link href="#">
            <Link to="/" className="admin-tools-link">
              <img src={art} alt="user-foto-admin" className="user-photo"/>
              Menas
            </Link>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavigationBar
