// import React, { useState } from "react";

// const Signup = () => {
//   const [user, setUser] = useState({
//     userId: null,
//     userFirstName: "",
//     userLastName: "",
//     username: "",
//     userPassword: "",
//     userJobTitle: "",
//     userRole: "",
//     files: [],
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:8080/home", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(user),
//       });
//       const data = await response.json();
//       console.log("User created:", data);
//       setUser({
//         userId: null,
//         userFirstName: "",
//         userLastName: "",
//         username: "",
//         userPassword: "",
//         userJobTitle: "",
//         userRole: "",
//         files: [],
//       });
//     } catch (error) {
//       console.error("Error creating user:", error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>
//           First Name:
//           <input
//             type="text"
//             name="userFirstName"
//             value={user.userFirstName}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Last Name:
//           <input
//             type="text"
//             name="userLastName"
//             value={user.userLastName}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Username:
//           <input
//             type="text"
//             name="username"
//             value={user.username}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Password:
//           <input
//             type="password"
//             name="userPassword"
//             value={user.userPassword}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Job Title:
//           <input
//             type="text"
//             name="userJobTitle"
//             value={user.userJobTitle}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Role:
//           <input
//             type="text"
//             name="userRole"
//             value={user.userRole}
//             onChange={handleChange}
//           />
//         </label>
//         <button type="submit">Create User</button>
//       </form>
//     </div>
//   );
// };

// export default Signup;
