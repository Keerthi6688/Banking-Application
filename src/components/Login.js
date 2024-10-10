// import React, { useState,useEffect } from "react";
// import axios from "axios";
// import bcrypt from "bcryptjs"; // bcryptjs to compare the encrypted password
// import { useNavigate } from "react-router-dom";
// import './Login.css';

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//    // Clear form inputs when the page loads or reloads
//    useEffect(() => {
//     setEmail("");
//     setPassword("");
//   }, []);

//   // Function to handle login
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(""); // Reset error

//     try {
//       // Fetch all customers from Firestore
//       const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL);
//       const customers = response.data.documents; // Access the documents array

//       // Find the document with the matching email
//       const customer = customers.find(
//         (doc) => doc.fields.Email.stringValue === email
//       );

//       if (!customer) {
//         // If no customer matches the email
//         setError("Email not found. Please sign up first.");
//         return;
//       }

//       // Extract the hashed password from Firestore
//       const storedPassword = customer.fields.Password.stringValue;

//       // Compare entered password with the hashed password using bcrypt
//       const passwordMatch = await bcrypt.compare(password, storedPassword);

//       if (passwordMatch) {
//         // If the password matches, store the email in sessionStorage
//         sessionStorage.setItem("loggedInUser", email);

//         // Redirect to the customer dashboard
//         navigate("/customer-page");
//       } else {
//         // If passwords don't match
//         setError("Invalid password. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error during login", error);
//       setError("An error occurred. Please try again.");
//     }
//   };

//   // Redirect to signup page
//   const handleCreateAccount = () => {
//     navigate("/signup");
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div className="input-container">
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="input-container">
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         {error && <p className="error-message">{error}</p>}
//         <button type="submit">Login</button>
//       </form>
      
//       <p>Don't have an account?</p>
//       <button className="create-account-button" onClick={handleCreateAccount}>
//         Create Account
//       </button>
//     </div>
//   );
// };

// export default Login;



// import React, { useState } from "react";
// import axios from "axios";
// import bcrypt from "bcryptjs"; // bcryptjs to compare the encrypted password
// import { useNavigate } from "react-router-dom";
// import './Login.css';

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   // Function to handle login
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(""); // Reset error

//     try {
//       // Fetch all customers from Firestore
//       const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL);
//       const customers = response.data.documents; // Access the documents array

//       // Find the document with the matching email
//       const customer = customers.find(
//         (doc) => doc.fields.Email.stringValue === email
//       );

//       if (!customer) {
//         // If no customer matches the email
//         setError("Email not found. Please sign up first.");
//         return;
//       }

//       // Extract the hashed password from Firestore
//       const storedPassword = customer.fields.Password.stringValue;

//       // Compare entered password with the hashed password using bcrypt
//       const passwordMatch = await bcrypt.compare(password, storedPassword);

//       if (passwordMatch) {
//         // If the password matches, store the email in sessionStorage
//         sessionStorage.setItem("loggedInUser", email);

//         // Redirect to the customer dashboard
//         navigate("/customer-page");
//       } else {
//         // If passwords don't match
//         setError("Invalid password. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error during login", error);
//       setError("An error occurred. Please try again.");
//     }
//   };

//   // Redirect to signup page
//   const handleCreateAccount = () => {
//     navigate("/signup");
//   };

//   // Reset fields on component mount (this happens on page reload)
//   const resetFields = () => {
//     setEmail("");
//     setPassword("");
//   };

//   // Clear the form fields when the component mounts
//   React.useEffect(() => {
//     resetFields();
//   }, []);

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div className="input-container">
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="input-container">
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         {error && <p className="error-message">{error}</p>}
//         <button type="submit">Login</button>
//       </form>

//       <button className="create-account-button" onClick={handleCreateAccount}>
//         Create Account
//       </button>
//     </div>
//   );
// };

// export default Login;






import React, { useState } from "react";
import axios from "axios";
import bcrypt from "bcryptjs"; // bcryptjs to compare the encrypted password
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Hardcoded admin login credentials
  const adminEmail = "Keerthi6688@gmail.com";
  const adminPassword = "Keerthi@6688";

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error

    // Check if the entered credentials match the hardcoded admin credentials
    if (email === adminEmail && password === adminPassword) {
      // If admin credentials match, redirect to Admin.js
      navigate("/admin");
      return;
    }

    // If not admin, proceed to check customer credentials
    try {
      // Fetch all customers from Firestore
      const response = await axios.get(process.env.REACT_APP_CUSTOMERS_URL);
      const customers = response.data.documents; // Access the documents array

      // Find the document with the matching email
      const customer = customers.find(
        (doc) => doc.fields.Email.stringValue === email
      );

      if (!customer) {
        // If no customer matches the email
        setError("Email not found. Please sign up first.");
        return;
      }

      // Extract the hashed password from Firestore
      const storedPassword = customer.fields.Password.stringValue;

      // Compare entered password with the hashed password using bcrypt
      const passwordMatch = await bcrypt.compare(password, storedPassword);

      if (passwordMatch) {
        // If the password matches, store the email in sessionStorage
        sessionStorage.setItem("loggedInUser", email);

        // Redirect to the customer dashboard
        navigate("/customer-page");
      } else {
        // If passwords don't match
        setError("Invalid password. Please try again.");
      }
    } catch (error) {
      console.error("Error during login", error);
      setError("An error occurred. Please try again.");
    }
  };

  // Redirect to signup page
  const handleCreateAccount = () => {
    navigate("/signup");
  };

  // Reset fields on component mount (this happens on page reload)
  const resetFields = () => {
    setEmail("");
    setPassword("");
  };

  // Clear the form fields when the component mounts
  React.useEffect(() => {
    resetFields();
  }, []);

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>

      <button className="create-account-button" onClick={handleCreateAccount}>
        Create Account
      </button>
    </div>
  );
};

export default Login;
