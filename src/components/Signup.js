// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import './Signup.css'; // Add CSS for styling

// const Signup = () => {
//   const navigate = useNavigate();

//   // State for form data
//   const [formData, setFormData] = useState({
//     fullName: "",
//     dob: "",
//     gender: "Male",
//     nationality: "",
//     address: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     accountType: "Savings",
//     initialDeposit: "",
//     panCard: null,
//     aadharCard: null
//   });

//   // State for validation errors
//   const [error, setError] = useState("");

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle file uploads
//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData({ ...formData, [name]: files[0] });
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Password and Confirm Password Validation
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     // Initial Deposit Validation
//     if (formData.initialDeposit < 100000) {
//       setError("Initial deposit must be at least 100,000 INR!");
//       return;
//     }

//     // Check if PAN and Aadhar are uploaded
//     if (!formData.panCard || !formData.aadharCard) {
//       setError("Please upload both PAN Card and Aadhar Card!");
//       return;
//     }

//     // If everything is valid, proceed to submit the form (API call can be placed here)
//     console.log("Form submitted successfully with data:", formData);

//     // Reset error and navigate to login or success page
//     setError("");
//     navigate("/"); // Redirect to login or dashboard after signup
//   };

//   return (
//     <div className="signup-container">
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Section 1: Basic Details */}
//         <fieldset>
//           <legend>Basic Details</legend>
//           <div className="input-container">
//             <label>Full Name:</label>
//             <input
//               type="text"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label>Date of Birth:</label>
//             <input
//               type="date"
//               name="dob"
//               value={formData.dob}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label>Gender:</label>
//             <input
//               type="radio"
//               name="gender"
//               value="Male"
//               checked={formData.gender === "Male"}
//               onChange={handleChange}
//             />
//             Male
//             <input
//               type="radio"
//               name="gender"
//               value="Female"
//               checked={formData.gender === "Female"}
//               onChange={handleChange}
//             />
//             Female
//             <input
//               type="radio"
//               name="gender"
//               value="Others"
//               checked={formData.gender === "Others"}
//               onChange={handleChange}
//             />
//             Others
//           </div>
//           <div className="input-container">
//             <label>Nationality:</label>
//             <input
//               type="text"
//               name="nationality"
//               value={formData.nationality}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label>Address:</label>
//             <textarea
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </fieldset>

//         {/* Section 2: Login Credentials */}
//         <fieldset>
//           <legend>Login Credentials</legend>
//           <div className="input-container">
//             <label>Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label>Password:</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label>Confirm Password:</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </fieldset>

//         {/* Section 3: Banking Details */}
//         <fieldset>
//           <legend>Banking Details</legend>
//           <div className="input-container">
//             <label>Account Type:</label>
//             <select
//               name="accountType"
//               value={formData.accountType}
//               onChange={handleChange}
//               required
//             >
//               <option value="Savings">Savings Account</option>
//               <option value="Current">Current Account</option>
//             </select>
//           </div>
//           <div className="input-container">
//             <label>Initial Deposit (min 100,000 INR):</label>
//             <input
//               type="number"
//               name="initialDeposit"
//               value={formData.initialDeposit}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label>PAN Card:</label>
//             <input
//               type="file"
//               name="panCard"
//               onChange={handleFileChange}
//               accept=".jpg,.jpeg,.png,.pdf"
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label>Aadhar Card:</label>
//             <input
//               type="file"
//               name="aadharCard"
//               onChange={handleFileChange}
//               accept=".jpg,.jpeg,.png,.pdf"
//               required
//             />
//           </div>
//         </fieldset>

//         {/* Display error message if any */}
//         {error && <p className="error-message">{error}</p>}

//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// };
// export default Signup;





// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import bcrypt from "bcryptjs";
// import './Signup.css'; // Add CSS for styling

// const Signup = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     fullName: "",
//     dob: "",
//     gender: "Male",
//     nationality: "",
//     address: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     accountType: "Savings",
//     initialDeposit: "",
//     panCard: null,
//     aadharCard: null
//   });

//   const [error, setError] = useState("");

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle file uploads
//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData({ ...formData, [name]: files[0] });
//   };

//   // Convert file to base64
//   const fileToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         resolve(reader.result);
//       };
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//   };

//   // Fetch existing customers to auto-increment the CustomerID
//   const getCustomerID = async () => {
//     try {
//       const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL);
//       const customers = response.data.documents || [];
//       return customers.length + 1;
//     } catch (error) {
//       console.error("Error fetching customer IDs", error);
//       return 1; // If error, start with ID 1
//     }
//   };

//   // Encrypt password using bcrypt
//   const encryptPassword = async (password) => {
//     const salt = await bcrypt.genSalt(10);
//     return await bcrypt.hash(password, salt);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Password Validation
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     // Initial Deposit Validation
//     if (formData.initialDeposit < 100000) {
//       setError("Initial deposit must be at least 100,000 INR!");
//       return;
//     }

//     // File validation (check if PAN and Aadhar are uploaded)
//     if (!formData.panCard || !formData.aadharCard) {
//       setError("Please upload both PAN Card and Aadhar Card!");
//       return;
//     }

//     try {
//       // Encrypt the password
//       const encryptedPassword = await encryptPassword(formData.password);

//       // Convert files to base64
//       const panCardBase64 = await fileToBase64(formData.panCard);
//       const aadharCardBase64 = await fileToBase64(formData.aadharCard);

//       // Fetch the next CustomerID
//       const customerID = await getCustomerID();

//       // Prepare data to send to Firestore
//       const customerData = {
//         fields: {
//           CustomerID: { integerValue: customerID },
//           Name: { stringValue: formData.fullName },
//           DOB: { stringValue: formData.dob },
//           Gender: { stringValue: formData.gender },
//           Nationality: { stringValue: formData.nationality },
//           Address: { stringValue: formData.address },
//           Email: { stringValue: formData.email },
//           Password: { stringValue: encryptedPassword },
//           Accounts: {
//             arrayValue: {
//               values: [
//                 {
//                   mapValue: {
//                     fields: {
//                       AccountType: { stringValue: formData.accountType },
//                       Balance: { integerValue: formData.initialDeposit },
//                     },
//                   },
//                 },
//               ],
//             },
//           },
//           PanCard: { stringValue: panCardBase64 },
//           AadharCard: { stringValue: aadharCardBase64 },
//         },
//       };

//       // Send the data to Firestore
//       await axios.post(process.env.REACT_APP_FIRESTORE_URL, customerData);

//       // Clear error and navigate to login page
//       setError("");
//       navigate("/"); // Redirect to login page or dashboard after signup
//     } catch (err) {
//       console.error("Error during signup", err);
//       setError("An error occurred during signup. Please try again.");
//     }
//   };

//   return (
//     <div className="signup-container">
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Basic Details Section */}
//         <fieldset>
//           <legend>Basic Details</legend>
//           <div className="input-container">
//             <label>Full Name:</label>
//             <input
//               type="text"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label>Date of Birth:</label>
//             <input
//               type="date"
//               name="dob"
//               value={formData.dob}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label>Gender:</label>
//             <input
//               type="radio"
//               name="gender"
//               value="Male"
//               checked={formData.gender === "Male"}
//               onChange={handleChange}
//             />
//             Male
//             <input
//               type="radio"
//               name="gender"
//               value="Female"
//               checked={formData.gender === "Female"}
//               onChange={handleChange}
//             />
//             Female
//             <input
//               type="radio"
//               name="gender"
//               value="Others"
//               checked={formData.gender === "Others"}
//               onChange={handleChange}
//             />
//             Others
//           </div>
//           <div className="input-container">
//             <label>Nationality:</label>
//             <input
//               type="text"
//               name="nationality"
//               value={formData.nationality}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label>Address:</label>
//             <textarea
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </fieldset>

//         {/* Login Credentials Section */}
//         <fieldset>
//           <legend>Login Credentials</legend>
//           <div className="input-container">
//             <label>Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label>Password:</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label>Confirm Password:</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </fieldset>

//         {/* Banking Details Section */}
//         <fieldset>
//           <legend>Banking Details</legend>
//           <div className="input-container">
//             <label>Account Type:</label>
//             <select
//               name="accountType"
//               value={formData.accountType}
//               onChange={handleChange}
//               required
//             >
//               <option value="Savings">Savings Account</option>
//               <option value="Current">Current Account</option>
//             </select>
//           </div>
//           <div className="input-container">
//             <label>Initial Deposit (min 100,000 INR):</label>
//             <input
//               type="number"
//               name="initialDeposit"
//               value={formData.initialDeposit}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label>PAN Card:</label>
//             <input
//               type="file"
//               name="panCard"
//               accept="image/*,application/pdf"
//               onChange={handleFileChange}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label>Aadhar Card:</label>
//             <input
//               type="file"
//               name="aadharCard"
//               accept="image/*,application/pdf"
//               onChange={handleFileChange}
//               required
//             />
//           </div>
//         </fieldset>

//         {error && <p className="error-message">{error}</p>}

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Signup;





// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import bcrypt from "bcryptjs";
// import './Signup.css'; // Add CSS for styling

// const Signup = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     fullName: "",
//     dob: "",
//     gender: "Male",
//     nationality: "",
//     address: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     accountType: "Savings",
//     initialDeposit: "",
//     panCard: null,
//     aadharCard: null
//   });

//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle file uploads
//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData({ ...formData, [name]: files[0] });
//   };

//   // Convert file to base64
//   const fileToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         resolve(reader.result);
//       };
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//   };

//   // Fetch existing customers to auto-increment the CustomerID
//   const getCustomerID = async () => {
//     try {
//       const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL);
//       const customers = response.data.documents || [];
//       return customers.length + 1; // Auto increment based on length of documents
//     } catch (error) {
//       console.error("Error fetching customer IDs", error);
//       return 1; // If error, start with ID 1
//     }
//   };

//   // Generate a 6-digit random account number
//   const generateAccountNumber = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
//   };

//   // Encrypt password using bcrypt
//   const encryptPassword = async (password) => {
//     const salt = await bcrypt.genSalt(10);
//     return await bcrypt.hash(password, salt);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Password Validation
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     // Initial Deposit Validation
//     if (formData.initialDeposit < 100000) {
//       setError("Initial deposit must be at least 100,000 INR!");
//       return;
//     }

//     // File validation (check if PAN and Aadhar are uploaded)
//     if (!formData.panCard || !formData.aadharCard) {
//       setError("Please upload both PAN Card and Aadhar Card!");
//       return;
//     }

//     try {
//       // Encrypt the password
//       const encryptedPassword = await encryptPassword(formData.password);

//       // Convert files to base64
//       const panCardBase64 = await fileToBase64(formData.panCard);
//       const aadharCardBase64 = await fileToBase64(formData.aadharCard);

//       // Fetch the next CustomerID
//       const customerID = await getCustomerID();

//       // Generate account number
//       const accountNumber = generateAccountNumber();

//       // Prepare data to send to Firestore
//       const customerData = {
//         fields: {
//           CustomerID: { integerValue: customerID },
//           Name: { stringValue: formData.fullName },
//           DOB: { stringValue: formData.dob },
//           Gender: { stringValue: formData.gender },
//           Nationality: { stringValue: formData.nationality },
//           Address: { stringValue: formData.address },
//           Email: { stringValue: formData.email },
//           Password: { stringValue: encryptedPassword },
//           Accounts: {
//             arrayValue: {
//               values: [
//                 {
//                   mapValue: {
//                     fields: {
//                       AccountType: { stringValue: formData.accountType },
//                       Balance: { integerValue: formData.initialDeposit },
//                       AccountNumber: { stringValue: accountNumber },
//                       IFSC: { stringValue: "Keerthi6688" }
//                     },
//                   },
//                 },
//               ],
//             },
//           },
//           PanCard: { stringValue: panCardBase64 },
//           AadharCard: { stringValue: aadharCardBase64 },
//         },
//       };

//       // Send the data to Firestore with CustomerID as the document ID
//       await axios.patch(`${process.env.REACT_APP_FIRESTORE_URL}/${customerID}`, customerData);

//       // Clear error and notify success
//       setError("");
//       setSuccessMessage("Account has been created successfully!");
//       // Redirect to login or dashboard after showing success message
//       setTimeout(() => {
//         navigate("/"); // Redirect after 2 seconds
//       }, 2000);
//     } catch (err) {
//       console.error("Error during signup", err);
//       setError("An error occurred during signup. Please try again.");
//     }
//   };

//   return (
//     <div className="signup-container">
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Basic Details Section */}
//         <fieldset>
//           <legend>Basic Details</legend>
//           <div className="input-container">
//             <label>Full Name:</label>
//             <input
//               type="text"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label>Date of Birth:</label>
//             <input
//               type="date"
//               name="dob"
//               value={formData.dob}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label>Gender:</label>
//             <input
//               type="radio"
//               name="gender"
//               value="Male"
//               checked={formData.gender === "Male"}
//               onChange={handleChange}
//             />
//             Male
//             <input
//               type="radio"
//               name="gender"
//               value="Female"
//               checked={formData.gender === "Female"}
//               onChange={handleChange}
//             />
//             Female
//             <input
//               type="radio"
//               name="gender"
//               value="Others"
//               checked={formData.gender === "Others"}
//               onChange={handleChange}
//             />
//             Others
//           </div>
//           <div className="input-container">
//             <label>Nationality:</label>
//             <input
//               type="text"
//               name="nationality"
//               value={formData.nationality}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label>Address:</label>
//             <textarea
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </fieldset>

//         {/* Login Credentials Section */}
//         <fieldset>
//           <legend>Login Credentials</legend>
//           <div className="input-container">
//             <label>Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label>Password:</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label>Confirm Password:</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </fieldset>

//         {/* Banking Details Section */}
//         <fieldset>
//           <legend>Banking Details</legend>
//           <div className="input-container">
//             <label>Account Type:</label>
//             <select
//               name="accountType"
//               value={formData.accountType}
//               onChange={handleChange}
//               required
//             >
//               <option value="Savings">Savings Account</option>
//               <option value="Current">Current Account</option>
//             </select>
//           </div>
//           <div className="input-container">
//             <label>Initial Deposit (min 100,000 INR):</label>
//             <input
//               type="number"
//               name="initialDeposit"
//               value={formData.initialDeposit}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label>PAN Card:</label>
//             <input
//               type="file"
//               name="panCard"
//               accept="image/*,application/pdf"
//               onChange={handleFileChange}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label>Aadhar Card:</label>
//             <input
//               type="file"
//               name="aadharCard"
//               accept="image/*,application/pdf"
//               onChange={handleFileChange}
//               required
//             />
//           </div>
//         </fieldset>

//         {error && <p className="error-message">{error}</p>}
//         {successMessage && <p className="success-message">{successMessage}</p>}

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Signup;






// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import bcrypt from "bcryptjs";
// import './Signup.css'; // Add CSS for styling

// const Signup = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     fullName: "",
//     dob: "",
//     gender: "Male",
//     nationality: "",
//     address: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     accountType: "Savings",
//     initialDeposit: "",
//     panCard: null,
//     aadharCard: null
//   });

//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle file uploads
//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData({ ...formData, [name]: files[0] });
//   };

//   // Convert file to base64
//   const fileToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         resolve(reader.result);
//       };
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//   };

//   // Fetch existing customers to auto-increment the CustomerID
//   const getCustomerID = async () => {
//     try {
//       const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL);
//       const customers = response.data.documents || [];
//       return customers.length + 1; // Auto increment based on length of documents
//     } catch (error) {
//       console.error("Error fetching customer IDs", error);
//       return 1; // If error, start with ID 1
//     }
//   };

//   // Generate a 6-digit random account number
//   const generateAccountNumber = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
//   };

//   // Encrypt password using bcrypt
//   const encryptPassword = async (password) => {
//     const salt = await bcrypt.genSalt(10);
//     return await bcrypt.hash(password, salt);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Password Validation
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     // Initial Deposit Validation
//     if (formData.initialDeposit < 100000) {
//       setError("Initial deposit must be at least 100,000 INR!");
//       return;
//     }

//     // File validation (check if PAN and Aadhar are uploaded)
//     if (!formData.panCard || !formData.aadharCard) {
//       setError("Please upload both PAN Card and Aadhar Card!");
//       return;
//     }

//     try {
//       // Encrypt the password
//       const encryptedPassword = await encryptPassword(formData.password);

//       // Convert files to base64
//       const panCardBase64 = await fileToBase64(formData.panCard);
//       const aadharCardBase64 = await fileToBase64(formData.aadharCard);

//       // Fetch the next CustomerID
//       const customerID = await getCustomerID();

//       // Generate account number
//       const accountNumber = generateAccountNumber();

//       // Prepare data to send to Firestore
//       const customerData = {
//         fields: {
//           CustomerID: { integerValue: customerID },
//           Name: { stringValue: formData.fullName },
//           DOB: { stringValue: formData.dob },
//           Gender: { stringValue: formData.gender },
//           Nationality: { stringValue: formData.nationality },
//           Address: { stringValue: formData.address },
//           Email: { stringValue: formData.email },
//           Password: { stringValue: encryptedPassword },
//           Accounts: {
//             arrayValue: {
//               values: [
//                 {
//                   mapValue: {
//                     fields: {
//                       AccountType: { stringValue: formData.accountType },
//                       Balance: { integerValue: formData.initialDeposit },
//                       AccountNumber: { stringValue: accountNumber },
//                       IFSC: { stringValue: "Keerthi6688" }
//                     },
//                   },
//                 },
//               ],
//             },
//           },
//           PanCard: { stringValue: panCardBase64 },
//           AadharCard: { stringValue: aadharCardBase64 },
//         },
//       };

//       // Send the data to Firestore with CustomerID as the document ID
//       await axios.patch(`${process.env.REACT_APP_FIRESTORE_URL}/${customerID}`, customerData);

//       // Clear error and notify success
//       setError("");
//       setSuccessMessage("Account has been created successfully!");
//       // Redirect to login or dashboard after showing success message
//       setTimeout(() => {
//         navigate("/"); // Redirect after 2 seconds
//       }, 2000);
//     } catch (err) {
//       console.error("Error during signup", err);
//       setError("An error occurred during signup. Please try again.");
//     }
//   };

//   return (
//     <div className="signup-container">
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Basic Details Section */}
//         <fieldset>
//           <legend>Basic Details</legend>
//           <div className="input-container">
//             <label>Full Name:</label>
//             <input
//               type="text"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label>Date of Birth:</label>
//             <input
//               type="date"
//               name="dob"
//               value={formData.dob}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label>Gender:</label>
//             <input
//               type="radio"
//               name="gender"
//               value="Male"
//               checked={formData.gender === "Male"}
//               onChange={handleChange}
//             />
//             Male
//             <input
//               type="radio"
//               name="gender"
//               value="Female"
//               checked={formData.gender === "Female"}
//               onChange={handleChange}
//             />
//             Female
//             <input
//               type="radio"
//               name="gender"
//               value="Others"
//               checked={formData.gender === "Others"}
//               onChange={handleChange}
//             />
//             Others
//           </div>
//           <div className="input-container">
//             <label>Nationality:</label>
//             <input
//               type="text"
//               name="nationality"
//               value={formData.nationality}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label>Address:</label>
//             <textarea
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </fieldset>

//         {/* Login Credentials Section */}
//         <fieldset>
//           <legend>Login Credentials</legend>
//           <div className="input-container">
//             <label>Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label>Password:</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label>Confirm Password:</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </fieldset>

//         {/* Banking Details Section */}
//         <fieldset>
//           <legend>Banking Details</legend>
//           <div className="input-container">
//             <label>Account Type:</label>
//             <select
//               name="accountType"
//               value={formData.accountType}
//               onChange={handleChange}
//               required
//             >
//               <option value="Savings">Savings Account</option>
//               <option value="Current">Current Account</option>
//             </select>
//           </div>
//           <div className="input-container">
//             <label>Initial Deposit (min 100,000 INR):</label>
//             <input
//               type="number"
//               name="initialDeposit"
//               value={formData.initialDeposit}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label>PAN Card:</label>
//             <input
//               type="file"
//               name="panCard"
//               accept="image/*,application/pdf"
//               onChange={handleFileChange}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <label>Aadhar Card:</label>
//             <input
//               type="file"
//               name="aadharCard"
//               accept="image/*,application/pdf"
//               onChange={handleFileChange}
//               required
//             />
//           </div>
//         </fieldset>

//         {error && <p className="error-message">{error}</p>}
//         {successMessage && <p className="success-message">{successMessage}</p>}

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Signup;




import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import './Signup.css'; // Add CSS for styling

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "Male",
    nationality: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "Savings",
    initialDeposit: "",
    panCard: null,
    aadharCard: null,
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  // Convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Fetch existing customers to auto-increment the CustomerID
  const getCustomerID = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL);
      const customers = response.data.documents || [];
      
      // Check if any documents exist
      if (customers.length > 0) {
        return customers.length + 1; // Auto increment based on length of documents
      } else {
        // If no documents exist, create one with ID 1
        const initialCustomerData = {
          fields: {
            CustomerID: { integerValue: 1 },
          },
        };
        await axios.post(process.env.REACT_APP_FIRESTORE_URL, initialCustomerData);
        return 1; // Return 1 as the ID after creating the first document
      }
    } catch (error) {
      console.error("Error fetching customer IDs", error);
      return 1; // If error, start with ID 1
    }
  };

  // Generate a 6-digit random account number
  const generateAccountNumber = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Encrypt password using bcrypt
  const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Initial Deposit Validation
    if (formData.initialDeposit < 100000) {
      setError("Initial deposit must be at least 100,000 INR!");
      return;
    }

    // File validation (check if PAN and Aadhar are uploaded)
    if (!formData.panCard || !formData.aadharCard) {
      setError("Please upload both PAN Card and Aadhar Card!");
      return;
    }

    try {
      // Encrypt the password
      const encryptedPassword = await encryptPassword(formData.password);

      // Convert files to base64
      const panCardBase64 = await fileToBase64(formData.panCard);
      const aadharCardBase64 = await fileToBase64(formData.aadharCard);

      // Fetch the next CustomerID
      const customerID = await getCustomerID();

      // Generate account number
      const accountNumber = generateAccountNumber();

      // Prepare data to send to Firestore
      const customerData = {
        fields: {
          CustomerID: { integerValue: customerID },
          Name: { stringValue: formData.fullName },
          DOB: { stringValue: formData.dob },
          Gender: { stringValue: formData.gender },
          Nationality: { stringValue: formData.nationality },
          Address: { stringValue: formData.address },
          Email: { stringValue: formData.email },
          Password: { stringValue: encryptedPassword },
          Accounts: {
            arrayValue: {
              values: [
                {
                  mapValue: {
                    fields: {
                      AccountType: { stringValue: formData.accountType },
                      Balance: { integerValue: formData.initialDeposit },
                      AccountNumber: { stringValue: accountNumber },
                      IFSC: { stringValue: "Keerthi6688" },
                    },
                  },
                },
              ],
            },
          },
          PanCard: { stringValue: panCardBase64 },
          AadharCard: { stringValue: aadharCardBase64 },
        },
      };

      // Send the data to Firestore's Accountrequest collection with CustomerID as the document ID
      await axios.patch(`${process.env.REACT_APP_FIRESTORE_URL}/${customerID}`, customerData);

      // Clear error and notify success
      setError("");
      setSuccessMessage("Account Creation request has been sent successfully!");
      // Redirect to login or dashboard after showing success message
      setTimeout(() => {
        navigate("/"); // Redirect after 2 seconds
      }, 2000);
    } catch (err) {
      console.error("Error during signup", err);
      setError("An error occurred during signup. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        {/* Basic Details Section */}
        <fieldset>
          <legend>Basic Details</legend>
          <div className="input-container">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
            <label>Gender:</label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />
            Male
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            Female
            <input
              type="radio"
              name="gender"
              value="Others"
              checked={formData.gender === "Others"}
              onChange={handleChange}
            />
            Others
          </div>
          <div className="input-container">
            <label>Nationality:</label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
            <label>Address:</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
        </fieldset>

        {/* Login Credentials Section */}
        <fieldset>
          <legend>Login Credentials</legend>
          <div className="input-container">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </fieldset>

        {/* Banking Details Section */}
        <fieldset>
          <legend>Banking Details</legend>
          <div className="input-container">
            <label>Account Type:</label>
            <select
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              required
            >
              <option value="Savings">Savings Account</option>
              <option value="Current">Current Account</option>
            </select>
          </div>
          <div className="input-container">
            <label>Initial Deposit (min 100,000 INR):</label>
            <input
              type="number"
              name="initialDeposit"
              value={formData.initialDeposit}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
            <label>PAN Card:</label>
            <input
              type="file"
              name="panCard"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="input-container">
            <label>Aadhar Card:</label>
            <input
              type="file"
              name="aadharCard"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              required
            />
          </div>
        </fieldset>

        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
