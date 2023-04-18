import React from "react";
import '../Admin/styles.css'
import w from '../Admin/photos/Untitled.png'
import useAuth from "./useAuth";


const Admin = () => {
  const authModal = useAuth();
  return (
      <>
      {authModal}
      <div className="pag-puslapis"></div>
      <h1 className="pag-antraste">Sveiki sugrize Administratoriau</h1>
      <img className="pag-foto" src={w}/>
      </>
  );
};

export default Admin;