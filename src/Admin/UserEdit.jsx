// // UserEdit.jsx
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import UserEditForm from "./UserEditForm";

// const UserEdit = () => {
//   const { id } = useParams();
//   const [product, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/admin/user/${id}`
//         );
//         setUser(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchUser();
//   }, [id]);

//   const handleEditSubmit = async (formData) => {
//     try {
//       await axios.put(`http://localhost:8080/admin/user/${id}`, formData);
//       alert("Vartotojas atnaujintas");
//     } catch (error) {
//       console.log(error);
//       alert("Atnaujinti nepavyko");
//     }
//   };

//   return (
//     <div>
//       {user ? (
//         <UserEditForm user={user} onSubmit={handleEditSubmit} />
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default UserEdit;
