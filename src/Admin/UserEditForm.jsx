// import { useState } from "react";

// function UserEditForm(props) {
//     const [firstName, setFirstName] = useState(props.user.firstName);
//     const [lastName, setLastName] = useState(props.user.lastName);
//     const [email, setEmail] = useState(props.user.email);

//     const handleSave = () => {
//         // Send a PUT request to update the user
//         axios.put(`http://localhost:8080/admin/user/${props.user.id}`, {
//             firstName: firstName,
//             lastName: lastName,
//             email: email
//         })
//         .then((response) => {
//             // Update the table with the new user data
//             props.onSave({
//                 id: props.user.id,
//                 firstName: firstName,
//                 lastName: lastName,
//                 email: email
//             });
//             // Close the modal
//             props.onClose();
//         })
//         .catch((error) => {
//             console.log(error);
//         });
//     };

//     return (
//         <div className="modal">
//             <div className="modal-content">
//                 <h2>Edit User</h2>
//                 <label>First Name:</label>
//                 <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//                 <label>Last Name:</label>
//                 <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
//                 <label>Email:</label>
//                 <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
//                 <button onClick={handleSave}>Save</button>
//                 <button onClick={props.onClose}>Cancel</button>
//             </div>
//         </div>
//     );
// }
