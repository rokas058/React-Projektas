import React from "react";
import '../Admin/styles.css'
import w from '../Admin/photos/Untitled.png'


const Admin = () => {
  return (
      <>
      <div className="pag-puslapis"></div>
      <h1 className="pag-antraste">Sveiki sugrize Administratoriau</h1>
      <img className="pag-foto" src={w} alt="foto-admino-puslapio"/>
      </>
  );
};

export default Admin;
