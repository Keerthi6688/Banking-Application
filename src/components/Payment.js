// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import './Payment.css';  // Add appropriate styles

// const Payment = () => {
//   const navigate = useNavigate();
//   const [customerData, setCustomerData] = useState(null);
//   const [fromAccount, setFromAccount] = useState("");
//   const [toAccount, setToAccount] = useState("");
//   const [recipientName, setRecipientName] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [amount, setAmount] = useState("");
//   const [error, setError] = useState("");
//   const loggedInUser = sessionStorage.getItem("loggedInUser");

//   useEffect(() => {
//     const fetchCustomerData = async () => {
//       try {
//         // Fetch all customers from Firestore
//         const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL);
//         const customers = response.data.documents;

//         // Find the customer document with the matching email
//         const customer = customers.find(
//           (doc) => doc.fields.Email.stringValue === loggedInUser
//         );

//         if (customer) {
//           setCustomerData(customer.fields);
//           setRecipientName(customer.fields.Name.stringValue); // Set recipient name
//         } else {
//           setError("Customer not found. Please log in again.");
//         }
//       } catch (error) {
//         console.error("Error fetching customer data", error);
//         setError("An error occurred while fetching customer data.");
//       }
//     };

//     if (loggedInUser) {
//       fetchCustomerData();
//     } else {
//       navigate("/login");
//     }
//   }, [loggedInUser, navigate]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!fromAccount || !toAccount || !ifscCode || !amount) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     // Perform payment logic here, like sending the payment request
//     console.log("Payment processed with details:", {
//       fromAccount,
//       toAccount,
//       recipientName,
//       ifscCode,
//       amount,
//     });

//     alert("Payment processed successfully!");
//     navigate("/customer");
//   };

//   return (
//     <div className="payment-page">
//       <div className="payment-container">
//         <h2>Send Money</h2>
//         {error && <p className="error-message">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           {/* From Account Number */}
//           <div className="form-group">
//             <label htmlFor="fromAccount">From Account Number:</label>
//             <select
//               id="fromAccount"
//               value={fromAccount}
//               onChange={(e) => setFromAccount(e.target.value)}
//               required
//             >
//               <option value="">Select Account</option>
//               {customerData &&
//                 customerData.Accounts.arrayValue.values.map((account, index) => (
//                   <option key={index} value={account.mapValue.fields.AccountNumber.stringValue}>
//                     {account.mapValue.fields.AccountNumber.stringValue}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           {/* To Account Number */}
//           <div className="form-group">
//             <label htmlFor="toAccount">To Account Number:</label>
//             <input
//               type="text"
//               id="toAccount"
//               value={toAccount}
//               onChange={(e) => setToAccount(e.target.value)}
//               required
//             />
//           </div>

//           {/* Recipient Name */}
//           <div className="form-group">
//             <label htmlFor="recipientName">Recipient Name:</label>
//             <input
//               type="text"
//               id="recipientName"
//               value={recipientName}
//               readOnly
//             />
//           </div>

//           {/* IFSC Code */}
//           <div className="form-group">
//             <label htmlFor="ifscCode">IFSC Code:</label>
//             <input
//               type="text"
//               id="ifscCode"
//               value={ifscCode}
//               onChange={(e) => setIfscCode(e.target.value)}
//               required
//             />
//           </div>

//           {/* Amount */}
//           <div className="form-group">
//             <label htmlFor="amount">Amount:</label>
//             <input
//               type="number"
//               id="amount"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <button type="submit" className="submit-button">Send Money</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Payment;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import './Payment.css';  // Add appropriate styles

// const Payment = () => {
//   const navigate = useNavigate();
//   const [customerData, setCustomerData] = useState(null);
//   const [fromAccount, setFromAccount] = useState("");
//   const [toAccount, setToAccount] = useState("");
//   const [recipientName, setRecipientName] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [amount, setAmount] = useState("");
//   const [customerID, setCustomerID] = useState("");
//   const [error, setError] = useState("");
//   const loggedInUser = sessionStorage.getItem("loggedInUser");

//   useEffect(() => {
//     const fetchCustomerData = async () => {
//       try {
//         // Fetch all customers from Firestore
//         const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL);
//         const customers = response.data.documents;

//         // Find the customer document with the matching email
//         const customer = customers.find(
//           (doc) => doc.fields.Email.stringValue === loggedInUser
//         );

//         if (customer) {
//           setCustomerData(customer.fields);
//         //   setRecipientName(customer.fields.Name.stringValue); // Set recipient name
//           setCustomerID(customer.fields.CustomerID.stringValue); // Set CustomerID
//         } else {
//           setError("Customer not found. Please log in again.");
//         }
//       } catch (error) {
//         console.error("Error fetching customer data", error);
//         setError("An error occurred while fetching customer data.");
//       }
//     };

//     if (loggedInUser) {
//       fetchCustomerData();
//     } else {
//       navigate("/login");
//     }
//   }, [loggedInUser, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!fromAccount || !toAccount || !ifscCode || !amount) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     // Construct the transaction object
//     const transactionData = {
//       FromAccountNumber: fromAccount,
//       ToAccountNumber: toAccount,
//       RecipientName: recipientName,
//       IFSC: ifscCode,
//       Amount: amount,
//       Timestamp: new Date().toISOString() // Generate current timestamp
//     };

//     try {
//       // Fetch the customer's Transactions document by CustomerID
//       const transactionsResponse = await axios.get(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`);

//       // Get existing transactions or initialize an empty array
//       const existingTransactions = transactionsResponse.data.fields.Transactions?.arrayValue?.values || [];

//       // Add the new transaction to the array
//       const updatedTransactions = [...existingTransactions, { mapValue: { fields: transactionData } }];

//       // Update the Transactions document in Firestore
//       await axios.patch(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`, {
//         fields: {
//           Transactions: {
//             arrayValue: {
//               values: updatedTransactions
//             }
//           }
//         }
//       });

//       alert("Payment processed and transaction recorded successfully!");
//       navigate("/customer");

//     } catch (error) {
//       console.error("Error storing transaction", error);
//       setError("An error occurred while processing the transaction.");
//     }
//   };

//   return (
//     <div className="payment-page">
//       <div className="payment-container">
//         <h2>Send Money</h2>
//         {error && <p className="error-message">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           {/* From Account Number */}
//           <div className="form-group">
//             <label htmlFor="fromAccount">From Account Number:</label>
//             <select
//               id="fromAccount"
//               value={fromAccount}
//               onChange={(e) => setFromAccount(e.target.value)}
//               required
//             >
//               <option value="">Select Account</option>
//               {customerData &&
//                 customerData.Accounts.arrayValue.values.map((account, index) => (
//                   <option key={index} value={account.mapValue.fields.AccountNumber.stringValue}>
//                     {account.mapValue.fields.AccountNumber.stringValue}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           {/* To Account Number */}
//           <div className="form-group">
//             <label htmlFor="toAccount">To Account Number:</label>
//             <input
//               type="text"
//               id="toAccount"
//               value={toAccount}
//               onChange={(e) => setToAccount(e.target.value)}
//               required
//             />
//           </div>

//           {/* Recipient Name */}
//           <div className="form-group">
//             <label htmlFor="recipientName">Recipient Name:</label>
//             <input
//               type="text"
//               id="recipientName"
//               value={recipientName}
//               readOnly
//             />
//           </div>

//           {/* IFSC Code */}
//           <div className="form-group">
//             <label htmlFor="ifscCode">IFSC Code:</label>
//             <input
//               type="text"
//               id="ifscCode"
//               value={ifscCode}
//               onChange={(e) => setIfscCode(e.target.value)}
//               required
//             />
//           </div>

//           {/* Amount */}
//           <div className="form-group">
//             <label htmlFor="amount">Amount:</label>
//             <input
//               type="number"
//               id="amount"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <button type="submit" className="submit-button">Send Money</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Payment;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import './Payment.css';  // Add appropriate styles

// const Payment = () => {
//   const navigate = useNavigate();
//   const [customerData, setCustomerData] = useState(null);
//   const [fromAccount, setFromAccount] = useState("");
//   const [toAccount, setToAccount] = useState("");
//   const [recipientName, setRecipientName] = useState(""); // Now entered by user
//   const [ifscCode, setIfscCode] = useState("");
//   const [amount, setAmount] = useState("");
//   const [customerID, setCustomerID] = useState("");
//   const [error, setError] = useState("");
//   const loggedInUser = sessionStorage.getItem("loggedInUser");

//   useEffect(() => {
//     const fetchCustomerData = async () => {
//       try {
//         // Fetch all customers from Firestore
//         const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL);
//         const customers = response.data.documents;

//         // Find the customer document with the matching email
//         const customer = customers.find(
//           (doc) => doc.fields.Email.stringValue === loggedInUser
//         );

//         if (customer) {
//           setCustomerData(customer.fields);
//           setCustomerID(customer.fields.CustomerID.stringValue); // Set CustomerID
//           console.log('Customer ID:', customerID);  // Add this before the patch request
//         } else {
//           setError("Customer not found. Please log in again.");
//         }
//       } catch (error) {
//         console.error("Error fetching customer data", error);
//         setError("An error occurred while fetching customer data.");
//       }
//     };

//     if (loggedInUser) {
//       fetchCustomerData();
//     } else {
//       navigate("/login");
//     }
//   }, [loggedInUser, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!fromAccount || !toAccount || !recipientName || !ifscCode || !amount) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     // Construct the transaction object
//     const transactionData = {
//       FromAccountNumber: fromAccount,
//       ToAccountNumber: toAccount,
//       RecipientName: recipientName, // Now entered by user
//       IFSC: ifscCode,
//       Amount: amount,
//       Timestamp: new Date().toISOString() // Generate current timestamp
//     };

//     try {
       

//       // Fetch the customer's Transactions document by CustomerID
//       const transactionsResponse = await axios.get(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`);
//       console.log('Transactions response:', transactionsResponse);
//       // Get existing transactions or initialize an empty array
//       const existingTransactions = transactionsResponse.data.fields.Transactions?.arrayValue?.values || [];

//       // Add the new transaction to the array
//       const updatedTransactions = [...existingTransactions, { mapValue: { fields: transactionData } }];

//       // Update the Transactions document in Firestore
//       await axios.patch(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`, {
//         fields: {
//           Transactions: {
//             arrayValue: {
//               values: updatedTransactions
//             }
//           }
//         }
//       });

//       alert("Payment processed and transaction recorded successfully!");
//       navigate("/customer");

//     } catch (error) {
//       console.error("Error storing transaction", error);
//       setError("An error occurred while processing the transaction.");
//     }
//   };

//   return (
//     <div className="payment-page">
//       <div className="payment-container">
//         <h2>Send Money</h2>
//         {error && <p className="error-message">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           {/* From Account Number */}
//           <div className="form-group">
//             <label htmlFor="fromAccount">From Account Number:</label>
//             <select
//               id="fromAccount"
//               value={fromAccount}
//               onChange={(e) => setFromAccount(e.target.value)}
//               required
//             >
//               <option value="">Select Account</option>
//               {customerData &&
//                 customerData.Accounts.arrayValue.values.map((account, index) => (
//                   <option key={index} value={account.mapValue.fields.AccountNumber.stringValue}>
//                     {account.mapValue.fields.AccountNumber.stringValue}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           {/* To Account Number */}
//           <div className="form-group">
//             <label htmlFor="toAccount">To Account Number:</label>
//             <input
//               type="text"
//               id="toAccount"
//               value={toAccount}
//               onChange={(e) => setToAccount(e.target.value)}
//               required
//             />
//           </div>

//           {/* Recipient Name */}
//           <div className="form-group">
//             <label htmlFor="recipientName">Recipient Name:</label>
//             <input
//               type="text"
//               id="recipientName"
//               value={recipientName}
//               onChange={(e) => setRecipientName(e.target.value)}  // User input
//               required
//             />
//           </div>

//           {/* IFSC Code */}
//           <div className="form-group">
//             <label htmlFor="ifscCode">IFSC Code:</label>
//             <input
//               type="text"
//               id="ifscCode"
//               value={ifscCode}
//               onChange={(e) => setIfscCode(e.target.value)}
//               required
//             />
//           </div>

//           {/* Amount */}
//           <div className="form-group">
//             <label htmlFor="amount">Amount:</label>
//             <input
//               type="number"
//               id="amount"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <button type="submit" className="submit-button">Send Money</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Payment;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import './Payment.css';  // Add appropriate styles

// const Payment = () => {
//   const navigate = useNavigate();
//   const [customerData, setCustomerData] = useState(null);
//   const [fromAccount, setFromAccount] = useState("");
//   const [toAccount, setToAccount] = useState("");
//   const [recipientName, setRecipientName] = useState(""); // Now entered by user
//   const [ifscCode, setIfscCode] = useState("");
//   const [amount, setAmount] = useState("");
//   const [customerID, setCustomerID] = useState(""); // Store the CustomerID
//   const [error, setError] = useState("");
//   const loggedInUser = sessionStorage.getItem("loggedInUser");

//   useEffect(() => {
//     const fetchCustomerData = async () => {
//       try {
//         // Fetch all customers from Firestore
//         const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL);
//         const customers = response.data.documents;

//         // Find the customer document with the matching email
//         const customer = customers.find(
//           (doc) => doc.fields.Email.stringValue === loggedInUser
//         );

//         if (customer) {
//           setCustomerData(customer.fields);
//           setCustomerID(customer.fields.CustomerID.stringValue); // Set CustomerID
//           console.log('Customer ID:', customer.fields.CustomerID.integerValue);
//         } else {
//           setError("Customer not found. Please log in again.");
//         }
//       } catch (error) {
//         console.error("Error fetching customer data", error);
//         setError("An error occurred while fetching customer data.");
//       }
//     };

//     if (loggedInUser) {
//       fetchCustomerData();
//     } else {
//       navigate("/login");
//     }
//   }, [loggedInUser, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!fromAccount || !toAccount || !recipientName || !ifscCode || !amount) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     // Construct the transaction object
//     const transactionData = {
//       FromAccountNumber: fromAccount,
//       ToAccountNumber: toAccount,
//       RecipientName: recipientName, // Entered by user
//       IFSC: ifscCode,
//       Amount: amount,
//       Timestamp: new Date().toISOString() // Generate current timestamp
//     };

//     try {
//       // Fetch the customer's Transactions document by CustomerID
//       const transactionsResponse = await axios.get(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`);
//       console.log('Transactions response:', transactionsResponse);

//       // Get existing transactions or initialize an empty array
//       const existingTransactions = transactionsResponse.data.fields.Transactions?.arrayValue?.values || [];

//       // Add the new transaction to the array
//       const updatedTransactions = [...existingTransactions, { mapValue: { fields: transactionData } }];

//       // Update the Transactions document in Firestore
//       await axios.patch(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`, {
//         fields: {
//           Transactions: {
//             arrayValue: {
//               values: updatedTransactions
//             }
//           }
//         }
//       });

//       alert("Payment processed and transaction recorded successfully!");
//       navigate("/customer");

//     } catch (error) {
//       console.error("Error storing transaction", error);
//       setError("An error occurred while processing the transaction.");
//     }
//   };

//   return (
//     <div className="payment-page">
//       <div className="payment-container">
//         <h2>Send Money</h2>
//         {error && <p className="error-message">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           {/* From Account Number */}
//           <div className="form-group">
//             <label htmlFor="fromAccount">From Account Number:</label>
//             <select
//               id="fromAccount"
//               value={fromAccount}
//               onChange={(e) => setFromAccount(e.target.value)}
//               required
//             >
//               <option value="">Select Account</option>
//               {customerData &&
//                 customerData.Accounts.arrayValue.values.map((account, index) => (
//                   <option key={index} value={account.mapValue.fields.AccountNumber.stringValue}>
//                     {account.mapValue.fields.AccountNumber.stringValue}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           {/* To Account Number */}
//           <div className="form-group">
//             <label htmlFor="toAccount">To Account Number:</label>
//             <input
//               type="text"
//               id="toAccount"
//               value={toAccount}
//               onChange={(e) => setToAccount(e.target.value)}
//               required
//             />
//           </div>

//           {/* Recipient Name */}
//           <div className="form-group">
//             <label htmlFor="recipientName">Recipient Name:</label>
//             <input
//               type="text"
//               id="recipientName"
//               value={recipientName}
//               onChange={(e) => setRecipientName(e.target.value)}  // User input
//               required
//             />
//           </div>

//           {/* IFSC Code */}
//           <div className="form-group">
//             <label htmlFor="ifscCode">IFSC Code:</label>
//             <input
//               type="text"
//               id="ifscCode"
//               value={ifscCode}
//               onChange={(e) => setIfscCode(e.target.value)}
//               required
//             />
//           </div>

//           {/* Amount */}
//           <div className="form-group">
//             <label htmlFor="amount">Amount:</label>
//             <input
//               type="number"
//               id="amount"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <button type="submit" className="submit-button">Send Money</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Payment;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import './Payment.css';  // Add appropriate styles

// const Payment = () => {
//   const navigate = useNavigate();
//   const [customerData, setCustomerData] = useState(null);
//   const [fromAccount, setFromAccount] = useState("");
//   const [toAccount, setToAccount] = useState("");
//   const [recipientName, setRecipientName] = useState(""); // Now entered by user
//   const [ifscCode, setIfscCode] = useState("");
//   const [amount, setAmount] = useState("");
//   const [customerID, setCustomerID] = useState("");
//   const [error, setError] = useState("");
//   const loggedInUser = sessionStorage.getItem("loggedInUser");

//   useEffect(() => {
//     const fetchCustomerData = async () => {
//       try {
//         // Fetch all customers from Firestore
//         const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL);
//         const customers = response.data.documents;

//         // Find the customer document with the matching email
//         const customer = customers.find(
//           (doc) => doc.fields.Email.stringValue === loggedInUser
//         );

//         if (customer) {
//           setCustomerData(customer.fields);
//           const fetchedCustomerID = customer.fields.CustomerID.integerValue;
//           setCustomerID(fetchedCustomerID); // Set CustomerID
//           console.log('Customer ID:', fetchedCustomerID); // Log for debugging
//         } else {
//           setError("Customer not found. Please log in again.");
//         }
//       } catch (error) {
//         console.error("Error fetching customer data", error);
//         setError("An error occurred while fetching customer data.");
//       }
//     };

//     if (loggedInUser) {
//       fetchCustomerData();
//     } else {
//       navigate("/login");
//     }
//   }, [loggedInUser, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!fromAccount || !toAccount || !recipientName || !ifscCode || !amount) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     // Construct the transaction object
//     const transactionData = {
//       FromAccountNumber: { stringValue: fromAccount },
//       ToAccountNumber: { stringValue: toAccount },
//       RecipientName: { stringValue: recipientName }, // Entered by user
//       IFSC: { stringValue: ifscCode },
//       Amount: { stringValue: amount },
//       Timestamp: { stringValue: new Date().toISOString() } // Generate current timestamp
//     };

//     try {
//       // Check if the customerID is available before making the request
//       if (!customerID) {
//         console.error("CustomerID is not available.");
//         setError("Failed to retrieve customer information. Please try again.");
//         return;
//       }

//       // First, check if the document exists for the customerID
//       let transactionsResponse;
//       try {
//         transactionsResponse = await axios.get(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`);
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           // Document not found, so we need to create a new one
//           console.log('Document not found. Creating a new document...');

//           // Create a new document with the initial transaction
//           await axios.post(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}?documentId=${customerID}`, {
//             fields: {
//               Transactions: {
//                 arrayValue: {
//                   values: [{ mapValue: { fields: transactionData } }]
//                 }
//               }
//             }
//           });

//           alert("Payment processed and new transaction document created successfully!");
//           navigate("/customer");
//           return;
//         } else {
//           // Some other error occurred
//           console.error("Error fetching transaction document", error);
//           setError("An error occurred while processing the transaction.");
//           return;
//         }
//       }

//       // If document exists, proceed to update it
//       console.log('Transactions response:', transactionsResponse);

//       // Get existing transactions or initialize an empty array
//       const existingTransactions = transactionsResponse.data.fields.Transactions?.arrayValue?.values || [];

//       // Add the new transaction to the array
//       const updatedTransactions = [...existingTransactions, { mapValue: { fields: transactionData } }];

//       // Update the Transactions document in Firestore
//       await axios.patch(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`, {
//         fields: {
//           Transactions: {
//             arrayValue: {
//               values: updatedTransactions
//             }
//           }
//         }
//       });

//       alert("Payment processed and transaction recorded successfully!");
//       navigate("/customer-page");

//     } catch (error) {
//       console.error("Error storing transaction", error);
//       setError("An error occurred while processing the transaction.");
//     }
//   };

//   return (
//     <div className="payment-page">
//       <div className="payment-container">
//         <h2>Send Money</h2>
//         {error && <p className="error-message">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           {/* From Account Number */}
//           <div className="form-group">
//             <label htmlFor="fromAccount">From Account Number:</label>
//             <select
//               id="fromAccount"
//               value={fromAccount}
//               onChange={(e) => setFromAccount(e.target.value)}
//               required
//             >
//               <option value="">Select Account</option>
//               {customerData &&
//                 customerData.Accounts.arrayValue.values.map((account, index) => (
//                   <option key={index} value={account.mapValue.fields.AccountNumber.stringValue}>
//                     {account.mapValue.fields.AccountNumber.stringValue}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           {/* To Account Number */}
//           <div className="form-group">
//             <label htmlFor="toAccount">To Account Number:</label>
//             <input
//               type="text"
//               id="toAccount"
//               value={toAccount}
//               onChange={(e) => setToAccount(e.target.value)}
//               required
//             />
//           </div>

//           {/* Recipient Name */}
//           <div className="form-group">
//             <label htmlFor="recipientName">Recipient Name:</label>
//             <input
//               type="text"
//               id="recipientName"
//               value={recipientName}
//               onChange={(e) => setRecipientName(e.target.value)}  // User input
//               required
//             />
//           </div>

//           {/* IFSC Code */}
//           <div className="form-group">
//             <label htmlFor="ifscCode">IFSC Code:</label>
//             <input
//               type="text"
//               id="ifscCode"
//               value={ifscCode}
//               onChange={(e) => setIfscCode(e.target.value)}
//               required
//             />
//           </div>

//           {/* Amount */}
//           <div className="form-group">
//             <label htmlFor="amount">Amount:</label>
//             <input
//               type="number"
//               id="amount"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <button type="submit" className="submit-button">Send Money</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Payment;






// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import './Payment.css';  // Add appropriate styles

// const Payment = () => {
//   const navigate = useNavigate();
//   const [customerData, setCustomerData] = useState(null);
//   const [fromAccount, setFromAccount] = useState("");
//   const [toAccount, setToAccount] = useState("");
//   const [recipientName, setRecipientName] = useState(""); // Now entered by user
//   const [ifscCode, setIfscCode] = useState("");
//   const [amount, setAmount] = useState("");
//   const [customerID, setCustomerID] = useState("");
//   const [error, setError] = useState("");
//   const loggedInUser = sessionStorage.getItem("loggedInUser");

//   useEffect(() => {
//     const fetchCustomerData = async () => {
//       try {
//         // Fetch all customers from Firestore
//         const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL);
//         const customers = response.data.documents;

//         // Find the customer document with the matching email
//         const customer = customers.find(
//           (doc) => doc.fields.Email.stringValue === loggedInUser
//         );

//         if (customer) {
//           setCustomerData(customer.fields);
//           const fetchedCustomerID = customer.fields.CustomerID.integerValue;
//           setCustomerID(fetchedCustomerID); // Set CustomerID
//           console.log('Customer ID:', fetchedCustomerID); // Log for debugging
//         } else {
//           setError("Customer not found. Please log in again.");
//         }
//       } catch (error) {
//         console.error("Error fetching customer data", error);
//         setError("An error occurred while fetching customer data.");
//       }
//     };

//     if (loggedInUser) {
//       fetchCustomerData();
//     } else {
//       navigate("/login");
//     }
//   }, [loggedInUser, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!fromAccount || !toAccount || !recipientName || !ifscCode || !amount) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     // Construct the transaction object
//     const transactionData = {
//       FromAccountNumber: { stringValue: fromAccount },
//       ToAccountNumber: { stringValue: toAccount },
//       RecipientName: { stringValue: recipientName }, // Entered by user
//       IFSC: { stringValue: ifscCode },
//       Amount: { stringValue: amount },
//       Debited: { booleanValue: true }, // Add Debited field
//       Timestamp: { stringValue: new Date().toISOString() } // Generate current timestamp
//     };

//     try {
//       // Check if the customerID is available before making the request
//       if (!customerID) {
//         console.error("CustomerID is not available.");
//         setError("Failed to retrieve customer information. Please try again.");
//         return;
//       }

//       // First, check if the document exists for the customerID
//       let transactionsResponse;
//       try {
//         transactionsResponse = await axios.get(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`);
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           // Document not found, so we need to create a new one
//           console.log('Document not found. Creating a new document...');

//           // Create a new document with the initial transaction
//           await axios.post(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}?documentId=${customerID}`, {
//             fields: {
//               Transactions: {
//                 arrayValue: {
//                   values: [{ mapValue: { fields: transactionData } }]
//                 }
//               }
//             }
//           });

//           // Update the customer's balance
//           await updateCustomerBalance(fromAccount, amount);
//           alert("Payment processed and new transaction document created successfully!");
//           navigate("/customer");
//           return;
//         } else {
//           // Some other error occurred
//           console.error("Error fetching transaction document", error);
//           setError("An error occurred while processing the transaction.");
//           return;
//         }
//       }

//       // If document exists, proceed to update it
//       console.log('Transactions response:', transactionsResponse);

//       // Get existing transactions or initialize an empty array
//       const existingTransactions = transactionsResponse.data.fields.Transactions?.arrayValue?.values || [];

//       // Add the new transaction to the array
//       const updatedTransactions = [...existingTransactions, { mapValue: { fields: transactionData } }];

//       // Update the Transactions document in Firestore
//       await axios.patch(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`, {
//         fields: {
//           Transactions: {
//             arrayValue: {
//               values: updatedTransactions
//             }
//           }
//         }
//       });

//       // Update the customer's balance
//       await updateCustomerBalance(fromAccount, amount);
//       alert("Payment processed and transaction recorded successfully!");
//       navigate("/customer");

//     } catch (error) {
//       console.error("Error storing transaction", error);
//       setError("An error occurred while processing the transaction.");
//     }
//   };

//   // Function to update the customer's balance
//   const updateCustomerBalance = async (accountNumber, paymentAmount) => {
//     try {
//       // Fetch the current balance for the customer's account
//       const customerResponse = await axios.get(`${process.env.REACT_APP_FIRESTORE_URL}/${customerID}`);
//       const currentBalance = customerResponse.data.fields.Accounts.arrayValue.values.find(
//         account => account.mapValue.fields.AccountNumber.stringValue === accountNumber
//       ).mapValue.fields.Balance.integerValue;

//       // Calculate the new balance
//       const newBalance = currentBalance - parseInt(paymentAmount, 10);

//       // Update the Balance field in Firestore
//       await axios.patch(`${process.env.REACT_APP_FIRESTORE_URL}/${customerID}`, {
//         fields: {
//           Accounts: {
//             arrayValue: {
//               values: customerResponse.data.fields.Accounts.arrayValue.values.map(account => {
//                 if (account.mapValue.fields.AccountNumber.stringValue === accountNumber) {
//                   return {
//                     mapValue: {
//                       fields: {
//                         ...account.mapValue.fields,
//                         Balance: { integerValue: newBalance } // Update only the Balance field
//                       }
//                     }
//                   };
//                 }
//                 return account; // Return other accounts unchanged
//               })
//             }
//           }
//         }
//       });

//       console.log("Balance updated successfully to:", newBalance);
//     } catch (error) {
//       console.error("Error updating balance:", error);
//     }
//   };

//   return (
//     <div className="payment-page">
//       <div className="payment-container">
//         <h2>Send Money</h2>
//         {error && <p className="error-message">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           {/* From Account Number */}
//           <div className="form-group">
//             <label htmlFor="fromAccount">From Account Number:</label>
//             <select
//               id="fromAccount"
//               value={fromAccount}
//               onChange={(e) => setFromAccount(e.target.value)}
//               required
//             >
//               <option value="">Select Account</option>
//               {customerData &&
//                 customerData.Accounts.arrayValue.values.map((account, index) => (
//                   <option key={index} value={account.mapValue.fields.AccountNumber.stringValue}>
//                     {account.mapValue.fields.AccountNumber.stringValue}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           {/* To Account Number */}
//           <div className="form-group">
//             <label htmlFor="toAccount">To Account Number:</label>
//             <input
//               type="text"
//               id="toAccount"
//               value={toAccount}
//               onChange={(e) => setToAccount(e.target.value)}
//               required
//             />
//           </div>

//           {/* Recipient Name */}
//           <div className="form-group">
//             <label htmlFor="recipientName">Recipient Name:</label>
//             <input
//               type="text"
//               id="recipientName"
//               value={recipientName}
//               onChange={(e) => setRecipientName(e.target.value)}  // User input
//               required
//             />
//           </div>

//           {/* IFSC Code */}
//           <div className="form-group">
//             <label htmlFor="ifscCode">IFSC Code:</label>
//             <input
//               type="text"
//               id="ifscCode"
//               value={ifscCode}
//               onChange={(e) => setIfscCode(e.target.value)}
//               required
//             />
//           </div>

//           {/* Amount */}
//           <div className="form-group">
//             <label htmlFor="amount">Amount:</label>
//             <input
//               type="number"
//               id="amount"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <button type="submit" className="submit-button">Send Money</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Payment;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import './Payment.css';  // Add appropriate styles

// const Payment = () => {
//   const navigate = useNavigate();
//   const [customerData, setCustomerData] = useState(null);
//   const [fromAccount, setFromAccount] = useState("");
//   const [toAccount, setToAccount] = useState("");
//   const [recipientName, setRecipientName] = useState(""); // Now entered by user
//   const [ifscCode, setIfscCode] = useState("");
//   const [amount, setAmount] = useState("");
//   const [customerID, setCustomerID] = useState("");
//   const [error, setError] = useState("");
//   const loggedInUser = sessionStorage.getItem("loggedInUser");

//   useEffect(() => {
//     const fetchCustomerData = async () => {
//       try {
//         // Fetch all customers from Firestore
//         const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL);
//         const customers = response.data.documents;

//         // Find the customer document with the matching email
//         const customer = customers.find(
//           (doc) => doc.fields.Email.stringValue === loggedInUser
//         );

//         if (customer) {
//           setCustomerData(customer.fields);
//           const fetchedCustomerID = customer.fields.CustomerID.integerValue;
//           setCustomerID(fetchedCustomerID); // Set CustomerID
//           console.log('Customer ID:', fetchedCustomerID); // Log for debugging
//         } else {
//           setError("Customer not found. Please log in again.");
//         }
//       } catch (error) {
//         console.error("Error fetching customer data", error);
//         setError("An error occurred while fetching customer data.");
//       }
//     };

//     if (loggedInUser) {
//       fetchCustomerData();
//     } else {
//       navigate("/login");
//     }
//   }, [loggedInUser, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!fromAccount || !toAccount || !recipientName || !ifscCode || !amount) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     // Construct the transaction object for the sender
//     const transactionDataSender = {
//       FromAccountNumber: { stringValue: fromAccount },
//       ToAccountNumber: { stringValue: toAccount },
//       RecipientName: { stringValue: recipientName }, // Entered by user
//       IFSC: { stringValue: ifscCode },
//       Amount: { stringValue: amount },
//       Debited: { booleanValue: true }, // Debited field true for sender
//       Timestamp: { stringValue: new Date().toISOString() } // Generate current timestamp
//     };

//     // Construct the transaction object for the receiver
//     const transactionDataReceiver = {
//       FromAccountNumber: { stringValue: fromAccount },
//       ToAccountNumber: { stringValue: toAccount },
//       RecipientName: { stringValue: recipientName },
//       IFSC: { stringValue: ifscCode },
//       Amount: { stringValue: amount },
//       Debited: { booleanValue: false }, // Debited field false for receiver
//       Timestamp: { stringValue: new Date().toISOString() } // Generate current timestamp
//     };

//     try {
//       // Check if the customerID is available before making the request
//       if (!customerID) {
//         console.error("CustomerID is not available.");
//         setError("Failed to retrieve customer information. Please try again.");
//         return;
//       }

//       // Store transaction details for the sender
//       await storeTransactionForCustomer(customerID, transactionDataSender, true);

//       // Now search for the receiver's document in the "Customers" collection
//       const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL);
//       const customers = response.data.documents;

//       // Find the customer document with the matching ToAccountNumber
//       const receiver = customers.find(
//         (doc) => doc.fields.Accounts.arrayValue.values.some(
//           account => account.mapValue.fields.AccountNumber.stringValue === toAccount
//         )
//       );

//       if (!receiver) {
//         setError("Receiver not found. Please check the To Account Number.");
//         return;
//       }

//       // Fetch the receiver's CustomerID
//       const receiverCustomerID = receiver.fields.CustomerID.integerValue;
//       console.log('Receiver Customer ID:', receiverCustomerID);

//       // Store transaction details for the receiver
//       await storeTransactionForCustomer(receiverCustomerID, transactionDataReceiver, false);

//       // Update the receiver's balance by adding the transaction amount
//       await updateCustomerBalanceForReceiver(receiverCustomerID, toAccount, amount);

//       alert("Payment processed and recorded for both sender and receiver successfully!");
//       navigate("/customer");

//     } catch (error) {
//       console.error("Error processing transaction", error);
//       setError("An error occurred while processing the transaction.");
//     }
//   };

//   // Function to store a transaction for a customer (sender/receiver)
//   const storeTransactionForCustomer = async (customerID, transactionData, isSender) => {
//     try {
//       let transactionsResponse;

//       // First, check if the document exists for the customerID
//       try {
//         transactionsResponse = await axios.get(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`);
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           // Document not found, so create a new one
//           console.log(`Document not found for ${isSender ? 'sender' : 'receiver'}. Creating a new document...`);

//           // Create a new document with the initial transaction
//           await axios.post(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}?documentId=${customerID}`, {
//             fields: {
//               Transactions: {
//                 arrayValue: {
//                   values: [{ mapValue: { fields: transactionData } }]
//                 }
//               }
//             }
//           });

//           return;
//         } else {
//           // Some other error occurred
//           throw error;
//         }
//       }

//       // If document exists, proceed to update it
//       console.log(`Transactions response for ${isSender ? 'sender' : 'receiver'}:`, transactionsResponse);

//       // Get existing transactions or initialize an empty array
//       const existingTransactions = transactionsResponse.data.fields.Transactions?.arrayValue?.values || [];

//       // Add the new transaction to the array
//       const updatedTransactions = [...existingTransactions, { mapValue: { fields: transactionData } }];

//       // Update the Transactions document in Firestore
//       await axios.patch(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`, {
//         fields: {
//           Transactions: {
//             arrayValue: {
//               values: updatedTransactions
//             }
//           }
//         }
//       });

//     } catch (error) {
//       console.error(`Error storing transaction for ${isSender ? 'sender' : 'receiver'}`, error);
//       throw error;
//     }
//   };

//   // Function to update the customer's balance (for the receiver)
//   const updateCustomerBalanceForReceiver = async (receiverCustomerID, accountNumber, paymentAmount) => {
//     try {
//       // Fetch the current balance for the receiver's account
//       const receiverResponse = await axios.get(`${process.env.REACT_APP_FIRESTORE_URL}/${receiverCustomerID}`);
//       const currentBalance = receiverResponse.data.fields.Accounts.arrayValue.values.find(
//         account => account.mapValue.fields.AccountNumber.stringValue === accountNumber
//       ).mapValue.fields.Balance.integerValue;

//       // Calculate the new balance
//       const newBalance = currentBalance + parseInt(paymentAmount, 10);

//       // Update the Balance field in Firestore without altering other fields
//       await axios.patch(`${process.env.REACT_APP_FIRESTORE_URL}/${receiverCustomerID}`, {
//         fields: {
//           Accounts: {
//             arrayValue: {
//               values: receiverResponse.data.fields.Accounts.arrayValue.values.map(account => {
//                 if (account.mapValue.fields.AccountNumber.stringValue === accountNumber) {
//                   return {
//                     mapValue: {
//                       fields: {
//                         ...account.mapValue.fields, // Preserve all other fields
//                         Balance: { integerValue: newBalance } // Update only the Balance field
//                       }
//                     }
//                   };
//                 }
//                 return account; // Return other accounts unchanged
//               })
//             }
//           }
//         }
//       });

//       console.log("Receiver's balance updated successfully to:", newBalance);
//     } catch (error) {
//       console.error("Error updating receiver's balance:", error);
//       throw error;
//     }
//   };

//   return (
//     <div className="payment-page">
//       <div className="payment-container">
//         <h2>Send Money</h2>
//         {error && <p className="error-message">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           {/* From Account Number */}
//           <div className="form-group">
//             <label htmlFor="fromAccount">From Account Number:</label>
//             <select
//               id="fromAccount"
//               value={fromAccount}
//               onChange={(e) => setFromAccount(e.target.value)}
//               required
//             >
//               <option value="">Select Account</option>
//               {customerData &&
//                 customerData.Accounts.arrayValue.values.map((account, index) => (
//                   <option key={index} value={account.mapValue.fields.AccountNumber.stringValue}>
//                     {account.mapValue.fields.AccountNumber.stringValue}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           {/* To Account Number */}
//           <div className="form-group">
//             <label htmlFor="toAccount">To Account Number:</label>
//             <input
//               type="text"
//               id="toAccount"
//               value={toAccount}
//               onChange={(e) => setToAccount(e.target.value)}
//               required
//             />
//           </div>

//           {/* Recipient Name */}
//           <div className="form-group">
//             <label htmlFor="recipientName">Recipient Name:</label>
//             <input
//               type="text"
//               id="recipientName"
//               value={recipientName}
//               onChange={(e) => setRecipientName(e.target.value)}
//               required
//             />
//           </div>

//           {/* IFSC Code */}
//           <div className="form-group">
//             <label htmlFor="ifscCode">IFSC Code:</label>
//             <input
//               type="text"
//               id="ifscCode"
//               value={ifscCode}
//               onChange={(e) => setIfscCode(e.target.value)}
//               required
//             />
//           </div>

//           {/* Amount */}
//           <div className="form-group">
//             <label htmlFor="amount">Amount:</label>
//             <input
//               type="number"
//               id="amount"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="form-group">
//             <button type="submit">Send Money</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Payment;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import './Payment.css';  // Add appropriate styles

// const Payment = () => {
//   const navigate = useNavigate();
//   const [customerData, setCustomerData] = useState(null);
//   const [fromAccount, setFromAccount] = useState("");
//   const [toAccount, setToAccount] = useState("");
//   const [recipientName, setRecipientName] = useState(""); // Now entered by user
//   const [ifscCode, setIfscCode] = useState("");
//   const [amount, setAmount] = useState("");
//   const [customerID, setCustomerID] = useState("");
//   const [error, setError] = useState("");
//   const loggedInUser = sessionStorage.getItem("loggedInUser");

//   useEffect(() => {
//     const fetchCustomerData = async () => {
//       try {
//         // Fetch all customers from Firestore
//         const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL);
//         const customers = response.data.documents;

//         // Find the customer document with the matching email
//         const customer = customers.find(
//           (doc) => doc.fields.Email.stringValue === loggedInUser
//         );

//         if (customer) {
//           setCustomerData(customer.fields);
//           const fetchedCustomerID = customer.fields.CustomerID.integerValue;
//           setCustomerID(fetchedCustomerID); // Set CustomerID
//           console.log('Customer ID:', fetchedCustomerID); // Log for debugging
//         } else {
//           setError("Customer not found. Please log in again.");
//         }
//       } catch (error) {
//         console.error("Error fetching customer data", error);
//         setError("An error occurred while fetching customer data.");
//       }
//     };

//     if (loggedInUser) {
//       fetchCustomerData();
//     } else {
//       navigate("/login");
//     }
//   }, [loggedInUser, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!fromAccount || !toAccount || !recipientName || !ifscCode || !amount) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     // Construct the transaction object for the sender
//     const transactionDataSender = {
//       FromAccountNumber: { stringValue: fromAccount },
//       ToAccountNumber: { stringValue: toAccount },
//       RecipientName: { stringValue: recipientName }, // Entered by user
//       IFSC: { stringValue: ifscCode },
//       Amount: { stringValue: amount },
//       Debited: { booleanValue: true }, // Debited field true for sender
//       Timestamp: { stringValue: new Date().toISOString() } // Generate current timestamp
//     };

//     // Construct the transaction object for the receiver
//     const transactionDataReceiver = {
//       FromAccountNumber: { stringValue: fromAccount },
//       ToAccountNumber: { stringValue: toAccount },
//       RecipientName: { stringValue: recipientName },
//       IFSC: { stringValue: ifscCode },
//       Amount: { stringValue: amount },
//       Debited: { booleanValue: false }, // Debited field false for receiver
//       Timestamp: { stringValue: new Date().toISOString() } // Generate current timestamp
//     };

//     try {
//       // Check if the customerID is available before making the request
//       if (!customerID) {
//         console.error("CustomerID is not available.");
//         setError("Failed to retrieve customer information. Please try again.");
//         return;
//       }

//       // Store transaction details for the sender
//       await storeTransactionForCustomer(customerID, transactionDataSender, true);

//       // Now search for the receiver's document in the "Customers" collection
//       const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL);
//       const customers = response.data.documents;

//       // Find the customer document with the matching ToAccountNumber
//       const receiver = customers.find(
//         (doc) => doc.fields.Accounts.arrayValue.values.some(
//           account => account.mapValue.fields.AccountNumber.stringValue === toAccount
//         )
//       );

//       if (!receiver) {
//         setError("Receiver not found. Please check the To Account Number.");
//         return;
//       }

//       // Fetch the receiver's CustomerID
//       const receiverCustomerID = receiver.fields.CustomerID.integerValue;
//       console.log('Receiver Customer ID:', receiverCustomerID);

//       // Store transaction details for the receiver
//       await storeTransactionForCustomer(receiverCustomerID, transactionDataReceiver, false);

//       // Update the balances for both the sender and the receiver
//       await updateCustomerBalance(customerID, fromAccount, -amount); // Deduct from sender
//       await updateCustomerBalance(receiverCustomerID, toAccount, amount); // Add to receiver

//       alert("Payment processed and recorded for both sender and receiver successfully!");
//       navigate("/customer");

//     } catch (error) {
//       console.error("Error processing transaction", error);
//       setError("An error occurred while processing the transaction.");
//     }
//   };

//   // Function to store a transaction for a customer (sender/receiver)
//   const storeTransactionForCustomer = async (customerID, transactionData, isSender) => {
//     try {
//       let transactionsResponse;

//       // First, check if the document exists for the customerID
//       try {
//         transactionsResponse = await axios.get(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`);
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           // Document not found, so create a new one
//           console.log(`Document not found for ${isSender ? 'sender' : 'receiver'}. Creating a new document...`);

//           // Create a new document with the initial transaction
//           await axios.post(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}?documentId=${customerID}`, {
//             fields: {
//               Transactions: {
//                 arrayValue: {
//                   values: [{ mapValue: { fields: transactionData } }]
//                 }
//               }
//             }
//           });

//           return;
//         } else {
//           // Some other error occurred
//           throw error;
//         }
//       }

//       // If document exists, proceed to update it
//       console.log(`Transactions response for ${isSender ? 'sender' : 'receiver'}:`, transactionsResponse);

//       // Get existing transactions or initialize an empty array
//       const existingTransactions = transactionsResponse.data.fields.Transactions?.arrayValue?.values || [];

//       // Add the new transaction to the array
//       const updatedTransactions = [...existingTransactions, { mapValue: { fields: transactionData } }];

//       // Update the Transactions document in Firestore
//       await axios.patch(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`, {
//         fields: {
//           Transactions: {
//             arrayValue: {
//               values: updatedTransactions
//             }
//           }
//         }
//       });

//     } catch (error) {
//       console.error(`Error storing transaction for ${isSender ? 'sender' : 'receiver'}`, error);
//       throw error;
//     }
//   };

//   // Function to update the customer's balance
//   const updateCustomerBalance = async (customerID, accountNumber, amountDelta) => {
//     try {
//       // Fetch the current balance for the account
//       const customerResponse = await axios.get(`${process.env.REACT_APP_FIRESTORE_URL}/${customerID}`);
//       const accountToUpdate = customerResponse.data.fields.Accounts.arrayValue.values.find(
//         account => account.mapValue.fields.AccountNumber.stringValue === accountNumber
//       );

//       const currentBalance = parseInt(accountToUpdate.mapValue.fields.Balance.integerValue, 10);
//       const newBalance = currentBalance + parseInt(amountDelta, 10); // Adjust balance

//       // Update the Balance field in Firestore without altering other fields
//       await axios.patch(`${process.env.REACT_APP_FIRESTORE_URL}/${customerID}`, {
//         fields: {
//           Accounts: {
//             arrayValue: {
//               values: customerResponse.data.fields.Accounts.arrayValue.values.map(account => {
//                 if (account.mapValue.fields.AccountNumber.stringValue === accountNumber) {
//                   return {
//                     mapValue: {
//                       fields: {
//                         ...account.mapValue.fields, // Preserve all other fields
//                         Balance: { integerValue: newBalance } // Update only the Balance field
//                       }
//                     }
//                   };
//                 }
//                 return account; // Return other accounts unchanged
//               })
//             }
//           }
//         }
//       });

//       console.log(`Customer ${customerID}'s balance updated successfully to:`, newBalance);
//     } catch (error) {
//       console.error("Error updating balance:", error);
//       throw error;
//     }
//   };

//   return (
//     <div className="payment-page">
//       <div className="payment-container">
//         <h2>Send Money</h2>
//         {error && <p className="error-message">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           {/* From Account Number */}
//           <div className="form-group">
//             <label htmlFor="fromAccount">From Account Number:</label>
//             <select
//               id="fromAccount"
//               value={fromAccount}
//               onChange={(e) => setFromAccount(e.target.value)}
//               required
//             >
//               <option value="">Select Account</option>
//               {customerData &&
//                 customerData.Accounts.arrayValue.values.map((account, index) => (
//                   <option
//                     key={index}
//                     value={account.mapValue.fields.AccountNumber.stringValue}
//                   >
//                     {account.mapValue.fields.AccountNumber.stringValue}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           {/* To Account Number */}
//           <div className="form-group">
//             <label htmlFor="toAccount">To Account Number:</label>
//             <input
//               type="text"
//               id="toAccount"
//               value={toAccount}
//               onChange={(e) => setToAccount(e.target.value)}
//               required
//             />
//           </div>

//           {/* Recipient Name */}
//           <div className="form-group">
//             <label htmlFor="recipientName">Recipient Name:</label>
//             <input
//               type="text"
//               id="recipientName"
//               value={recipientName}
//               onChange={(e) => setRecipientName(e.target.value)}
//               required
//             />
//           </div>

//           {/* IFSC Code */}
//           <div className="form-group">
//             <label htmlFor="ifscCode">IFSC Code:</label>
//             <input
//               type="text"
//               id="ifscCode"
//               value={ifscCode}
//               onChange={(e) => setIfscCode(e.target.value)}
//               required
//             />
//           </div>

//           {/* Amount */}
//           <div className="form-group">
//             <label htmlFor="amount">Amount:</label>
//             <input
//               type="number"
//               id="amount"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="form-group">
//             <button type="submit">Send Money</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Payment;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import './Payment.css';  // Add appropriate styles

// const Payment = () => {
//   const navigate = useNavigate();
//   const [customerData, setCustomerData] = useState(null);
//   const [fromAccount, setFromAccount] = useState("");
//   const [toAccount, setToAccount] = useState("");
//   const [recipientName, setRecipientName] = useState(""); // Now entered by user
//   const [ifscCode, setIfscCode] = useState("");
//   const [amount, setAmount] = useState("");
//   const [customerID, setCustomerID] = useState("");
//   const [error, setError] = useState("");
//   const loggedInUser = sessionStorage.getItem("loggedInUser");

//   useEffect(() => {
//     const fetchCustomerData = async () => {
//       try {
//         // Fetch all customers from Firestore
//         const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL);
//         const customers = response.data.documents;

//         // Find the customer document with the matching email
//         const customer = customers.find(
//           (doc) => doc.fields.Email.stringValue === loggedInUser
//         );

//         if (customer) {
//           setCustomerData(customer.fields);
//           const fetchedCustomerID = customer.fields.CustomerID.integerValue;
//           setCustomerID(fetchedCustomerID); // Set CustomerID
//           console.log('Customer ID:', fetchedCustomerID); // Log for debugging
//         } else {
//           setError("Customer not found. Please log in again.");
//         }
//       } catch (error) {
//         console.error("Error fetching customer data", error);
//         setError("An error occurred while fetching customer data.");
//       }
//     };

//     if (loggedInUser) {
//       fetchCustomerData();
//     } else {
//       navigate("/login");
//     }
//   }, [loggedInUser, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!fromAccount || !toAccount || !recipientName || !ifscCode || !amount) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     // Construct the transaction object for the sender
//     const transactionDataSender = {
//       FromAccountNumber: { stringValue: fromAccount },
//       ToAccountNumber: { stringValue: toAccount },
//       RecipientName: { stringValue: recipientName }, // Entered by user
//       IFSC: { stringValue: ifscCode },
//       Amount: { stringValue: amount },
//       Debited: { booleanValue: true }, // Debited field true for sender
//       Timestamp: { stringValue: new Date().toISOString() } // Generate current timestamp
//     };

//     // Construct the transaction object for the receiver
//     const transactionDataReceiver = {
//       FromAccountNumber: { stringValue: fromAccount },
//       ToAccountNumber: { stringValue: toAccount },
//       RecipientName: { stringValue: recipientName },
//       IFSC: { stringValue: ifscCode },
//       Amount: { stringValue: amount },
//       Debited: { booleanValue: false }, // Debited field false for receiver
//       Timestamp: { stringValue: new Date().toISOString() } // Generate current timestamp
//     };

//     try {
//       // Check if the customerID is available before making the request
//       if (!customerID) {
//         console.error("CustomerID is not available.");
//         setError("Failed to retrieve customer information. Please try again.");
//         return;
//       }

//       // Store transaction details for the sender
//       await storeTransactionForCustomer(customerID, transactionDataSender, true);

//       // Now search for the receiver's document in the "Customers" collection
//       const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL);
//       const customers = response.data.documents;

//       // Find the customer document with the matching ToAccountNumber
//       const receiver = customers.find(
//         (doc) => doc.fields.Accounts.arrayValue.values.some(
//           account => account.mapValue.fields.AccountNumber.stringValue === toAccount
//         )
//       );

//       if (!receiver) {
//         setError("Receiver not found. Please check the To Account Number.");
//         return;
//       }

//       // Fetch the receiver's CustomerID
//       const receiverCustomerID = receiver.fields.CustomerID.integerValue;
//       console.log('Receiver Customer ID:', receiverCustomerID);

//       // Store transaction details for the receiver
//       await storeTransactionForCustomer(receiverCustomerID, transactionDataReceiver, false);

//       // Update the balances for both the sender and the receiver
//       await updateCustomerBalance(customerID, fromAccount, -amount); // Deduct from sender
//       await updateCustomerBalance(receiverCustomerID, toAccount, amount); // Add to receiver

//       alert("Payment successfull!!!");
//       navigate("/customer-page");

//     } catch (error) {
//       console.error("Error processing transaction", error);
//       setError("An error occurred while processing the transaction.");
//     }
//   };

//   // Function to store a transaction for a customer (sender/receiver)
//   const storeTransactionForCustomer = async (customerID, transactionData, isSender) => {
//     try {
//       let transactionsResponse;

//       // First, check if the document exists for the customerID
//       try {
//         transactionsResponse = await axios.get(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`);
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           // Document not found, so create a new one
//           console.log(`Document not found for ${isSender ? 'sender' : 'receiver'}. Creating a new document...`);

//           // Create a new document with the initial transaction
//           await axios.post(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}?documentId=${customerID}`, {
//             fields: {
//               Transactions: {
//                 arrayValue: {
//                   values: [{ mapValue: { fields: transactionData } }]
//                 }
//               }
//             }
//           });

//           return;
//         } else {
//           // Some other error occurred
//           throw error;
//         }
//       }

//       // If document exists, proceed to update it
//       console.log(`Transactions response for ${isSender ? 'sender' : 'receiver'}:`, transactionsResponse);

//       // Get existing transactions or initialize an empty array
//       const existingTransactions = transactionsResponse.data.fields.Transactions?.arrayValue?.values || [];

//       // Add the new transaction to the array
//       const updatedTransactions = [...existingTransactions, { mapValue: { fields: transactionData } }];

//       // Update the Transactions document in Firestore
//       await axios.patch(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`, {
//         fields: {
//           Transactions: {
//             arrayValue: {
//               values: updatedTransactions
//             }
//           }
//         }
//       });

//     } catch (error) {
//       console.error(`Error storing transaction for ${isSender ? 'sender' : 'receiver'}`, error);
//       throw error;
//     }
//   };

//   // Function to update the customer's balance
//   const updateCustomerBalance = async (customerID, accountNumber, amountDelta) => {
//     try {
//       // Fetch the current balance for the account
//       const customerResponse = await axios.get(`${process.env.REACT_APP_FIRESTORE_URL}/${customerID}`);
//       const accountToUpdate = customerResponse.data.fields.Accounts.arrayValue.values.find(
//         account => account.mapValue.fields.AccountNumber.stringValue === accountNumber
//       );

//       const currentBalance = parseInt(accountToUpdate.mapValue.fields.Balance.integerValue, 10);
//       const newBalance = currentBalance + parseInt(amountDelta, 10); // Adjust balance

//       // Update the Balance field in Firestore without altering other fields
//       await axios.patch(`${process.env.REACT_APP_FIRESTORE_URL}/${customerID}`, {
//         fields: {
//           Accounts: {
//             arrayValue: {
//               values: customerResponse.data.fields.Accounts.arrayValue.values.map(account => {
//                 if (account.mapValue.fields.AccountNumber.stringValue === accountNumber) {
//                   return {
//                     mapValue: {
//                       fields: {
//                         ...account.mapValue.fields, // Preserve all other fields
//                         Balance: { integerValue: newBalance } // Update only the Balance field
//                       }
//                     }
//                   };
//                 }
//                 return account; // Return other accounts unchanged
//               })
//             }
//           }
//         }
//       });

//       console.log(`Customer ${customerID}'s balance updated successfully to:`, newBalance);
//     } catch (error) {
//       console.error("Error updating balance:", error);
//       throw error;
//     }
//   };

//   return (
//     <div className="payment-page">
//       <div className="payment-container">
//         <h2>Send Money</h2>
//         {error && <p className="error-message">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           {/* From Account Number */}
//           <div className="form-group">
//             <label htmlFor="fromAccount">From Account Number:</label>
//             <select
//               id="fromAccount"
//               value={fromAccount}
//               onChange={(e) => setFromAccount(e.target.value)}
//               required
//             >
//               <option value="">Select Account</option>
//               {customerData &&
//                 customerData.Accounts.arrayValue.values.map((account, index) => (
//                   <option
//                     key={index}
//                     value={account.mapValue.fields.AccountNumber.stringValue}
//                   >
//                     {account.mapValue.fields.AccountNumber.stringValue}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           {/* To Account Number */}
//           <div className="form-group">
//             <label htmlFor="toAccount">To Account Number:</label>
//             <input
//               type="text"
//               id="toAccount"
//               value={toAccount}
//               onChange={(e) => setToAccount(e.target.value)}
//               required
//             />
//           </div>

//           {/* Recipient Name */}
//           <div className="form-group">
//             <label htmlFor="recipientName">Recipient Name:</label>
//             <input
//               type="text"
//               id="recipientName"
//               value={recipientName}
//               onChange={(e) => setRecipientName(e.target.value)}
//               required
//             />
//           </div>

//           {/* IFSC Code */}
//           <div className="form-group">
//             <label htmlFor="ifscCode">IFSC Code:</label>
//             <input
//               type="text"
//               id="ifscCode"
//               value={ifscCode}
//               onChange={(e) => setIfscCode(e.target.value)}
//               required
//             />
//           </div>

//           {/* Amount */}
//           <div className="form-group">
//             <label htmlFor="amount">Amount:</label>
//             <input
//               type="number"
//               id="amount"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="form-group">
//             <button type="submit">Send Money</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Payment;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import './Payment.css';  // Add appropriate styles

// const Payment = () => {
//   const navigate = useNavigate();
//   const [customerData, setCustomerData] = useState(null);
//   const [fromAccount, setFromAccount] = useState("");
//   const [toAccount, setToAccount] = useState("");
//   const [recipientName, setRecipientName] = useState(""); // Now entered by user
//   const [ifscCode, setIfscCode] = useState("");
//   const [amount, setAmount] = useState("");
//   const [customerID, setCustomerID] = useState("");
//   const [error, setError] = useState("");
//   const loggedInUser = sessionStorage.getItem("loggedInUser");

//   useEffect(() => {
//     const fetchCustomerData = async () => {
//       try {
//         // Fetch all customers from Firestore
//         const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL);
//         const customers = response.data.documents;

//         // Find the customer document with the matching email
//         const customer = customers.find(
//           (doc) => doc.fields.Email.stringValue === loggedInUser
//         );

//         if (customer) {
//           setCustomerData(customer.fields);
//           const fetchedCustomerID = customer.fields.CustomerID.integerValue;
//           setCustomerID(fetchedCustomerID); // Set CustomerID
//           console.log('Customer ID:', fetchedCustomerID); // Log for debugging
//         } else {
//           setError("Customer not found. Please log in again.");
//         }
//       } catch (error) {
//         console.error("Error fetching customer data", error);
//         setError("An error occurred while fetching customer data.");
//       }
//     };

//     if (loggedInUser) {
//       fetchCustomerData();
//     } else {
//       navigate("/login");
//     }
//   }, [loggedInUser, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!fromAccount || !toAccount || !recipientName || !ifscCode || !amount) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     // Construct the transaction object for the sender
//     const transactionDataSender = {
//       FromAccountNumber: { stringValue: fromAccount },
//       ToAccountNumber: { stringValue: toAccount },
//       RecipientName: { stringValue: recipientName }, // Entered by user
//       IFSC: { stringValue: ifscCode },
//       Amount: { stringValue: amount },
//       Debited: { booleanValue: true }, // Debited field true for sender
//       Timestamp: { stringValue: new Date().toISOString() } // Generate current timestamp
//     };

//     // Construct the transaction object for the receiver
//     const transactionDataReceiver = {
//       FromAccountNumber: { stringValue: fromAccount },
//       ToAccountNumber: { stringValue: toAccount },
//       RecipientName: { stringValue: recipientName },
//       IFSC: { stringValue: ifscCode },
//       Amount: { stringValue: amount },
//       Debited: { booleanValue: false }, // Debited field false for receiver
//       Timestamp: { stringValue: new Date().toISOString() } // Generate current timestamp
//     };

//     try {
//       // Check if the customerID is available before making the request
//       if (!customerID) {
//         console.error("CustomerID is not available.");
//         setError("Failed to retrieve customer information. Please try again.");
//         return;
//       }

//       // Store transaction details for the sender
//       await storeTransactionForCustomer(customerID, transactionDataSender, true);

//       // Now search for the receiver's document in the "Customers" collection
//       const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL);
//       const customers = response.data.documents;

//       // Find the customer document with the matching ToAccountNumber
//       const receiver = customers.find(
//         (doc) => doc.fields.Accounts.arrayValue.values.some(
//           account => account.mapValue.fields.AccountNumber.stringValue === toAccount
//         )
//       );

//       if (!receiver) {
//         setError("Receiver not found. Please check the To Account Number.");
//         return;
//       }

//       // Fetch the receiver's CustomerID
//       const receiverCustomerID = receiver.fields.CustomerID.integerValue;
//       console.log('Receiver Customer ID:', receiverCustomerID);

//       // Store transaction details for the receiver
//       await storeTransactionForCustomer(receiverCustomerID, transactionDataReceiver, false);

//       // Update the balances for both the sender and the receiver
//       await updateCustomerBalance(customerID, fromAccount, -amount); // Deduct from sender
//       await updateCustomerBalance(receiverCustomerID, toAccount, amount); // Add to receiver

//       alert("Payment processed and recorded for both sender and receiver successfully!");
//       navigate("/customer-page");

//     } catch (error) {
//       console.error("Error processing transaction", error);
//       setError("An error occurred while processing the transaction.");
//     }
//   };

//   // Function to store a transaction for a customer (sender/receiver)
//   const storeTransactionForCustomer = async (customerID, transactionData, isSender) => {
//     try {
//       let transactionsResponse;

//       // First, check if the document exists for the customerID
//       try {
//         transactionsResponse = await axios.get(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`);
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           // Document not found, so create a new one
//           console.log(`Document not found for ${isSender ? 'sender' : 'receiver'}. Creating a new document...`);

//           // Create a new document with the initial transaction
//           await axios.post(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}?documentId=${customerID}`, {
//             fields: {
//               Transactions: {
//                 arrayValue: {
//                   values: [{ mapValue: { fields: transactionData } }]
//                 }
//               }
//             }
//           });

//           return;
//         } else {
//           // Some other error occurred
//           throw error;
//         }
//       }

//       // If document exists, proceed to update it
//       console.log(`Transactions response for ${isSender ? 'sender' : 'receiver'}:`, transactionsResponse);

//       // Get existing transactions or initialize an empty array
//       const existingTransactions = transactionsResponse.data.fields.Transactions?.arrayValue?.values || [];

//       // Add the new transaction to the array
//       const updatedTransactions = [...existingTransactions, { mapValue: { fields: transactionData } }];

//       // Update the Transactions document in Firestore
//       await axios.patch(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`, {
//         fields: {
//           Transactions: {
//             arrayValue: {
//               values: updatedTransactions
//             }
//           }
//         }
//       });

//     } catch (error) {
//       console.error(`Error storing transaction for ${isSender ? 'sender' : 'receiver'}`, error);
//       throw error;
//     }
//   };

//   // Function to update the customer's balance
//   const updateCustomerBalance = async (customerID, accountNumber, amountDelta) => {
//     try {
//       // Fetch the current customer document
//       const customerResponse = await axios.get(`${process.env.REACT_APP_FIRESTORE_URL}/${customerID}`);

//       // Get the account to update and all other fields (inside and outside Accounts)
//       const accounts = customerResponse.data.fields.Accounts.arrayValue.values;
//       const otherFields = { ...customerResponse.data.fields }; // Make a copy of all fields
//       delete otherFields.Accounts; // Remove Accounts from other fields

//       // Find the account within Accounts array to update its balance
//       const updatedAccounts = accounts.map(account => {
//         if (account.mapValue.fields.AccountNumber.stringValue === accountNumber) {
//           const currentBalance = parseInt(account.mapValue.fields.Balance.integerValue, 10);
//           const newBalance = currentBalance + parseInt(amountDelta, 10);

//           // Return the account with updated balance while keeping all other fields intact
//           return {
//             mapValue: {
//               fields: {
//                 ...account.mapValue.fields, // Preserve all other fields
//                 Balance: { integerValue: newBalance } // Update only the Balance field
//               }
//             }
//           };
//         }
//         return account; // Return other accounts unchanged
//       });

//       // Update only the Accounts array without affecting other fields in the document
//       await axios.patch(`${process.env.REACT_APP_FIRESTORE_URL}/${customerID}`, {
//         fields: {
//           Accounts: {
//             arrayValue: {
//               values: updatedAccounts
//             }
//           },
//           ...otherFields // Ensure all other fields outside of Accounts are preserved
//         }
//       });

//       console.log(`Customer ${customerID}'s balance updated successfully.`);
//     } catch (error) {
//       console.error("Error updating balance:", error);
//       throw error;
//     }
//   };

//   return (
//     <div className="payment-page">
//       <div className="payment-container">
//         <h2>Send Money</h2>
//         {error && <p className="error-message">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           {/* From Account Number */}
//           <div className="form-group">
//             <label htmlFor="fromAccount">From Account Number:</label>
//             <select
//               id="fromAccount"
//               value={fromAccount}
//               onChange={(e) => setFromAccount(e.target.value)}
//               required
//             >
//               <option value="">Select an Account</option>
//               {customerData?.Accounts?.arrayValue?.values?.map((account, index) => (
//                 <option
//                   key={index}
//                   value={account.mapValue.fields.AccountNumber.stringValue}
//                 >
//                   {account.mapValue.fields.AccountNumber.stringValue}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* To Account Number */}
//           <div className="form-group">
//             <label htmlFor="toAccount">To Account Number:</label>
//             <input
//               type="text"
//               id="toAccount"
//               value={toAccount}
//               onChange={(e) => setToAccount(e.target.value)}
//               required
//             />
//           </div>

//           {/* Recipient Name */}
//           <div className="form-group">
//             <label htmlFor="recipientName">Recipient Name:</label>
//             <input
//               type="text"
//               id="recipientName"
//               value={recipientName}
//               onChange={(e) => setRecipientName(e.target.value)}
//               required
//             />
//           </div>

//           {/* IFSC Code */}
//           <div className="form-group">
//             <label htmlFor="ifscCode">IFSC Code:</label>
//             <input
//               type="text"
//               id="ifscCode"
//               value={ifscCode}
//               onChange={(e) => setIfscCode(e.target.value)}
//               required
//             />
//           </div>

//           {/* Amount */}
//           <div className="form-group">
//             <label htmlFor="amount">Amount:</label>
//             <input
//               type="number"
//               id="amount"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="form-group">
//             <button type="submit">Send Money</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Payment;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Payment.css';  // Add appropriate styles

const Payment = () => {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState(null);
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [recipientName, setRecipientName] = useState(""); // Now entered by user
  const [ifscCode, setIfscCode] = useState("");
  const [amount, setAmount] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [error, setError] = useState("");
  const loggedInUser = sessionStorage.getItem("loggedInUser");

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        // Fetch all customers from Firestore
        const response = await axios.get(process.env.REACT_APP_CUSTOMERS_URL);
        const customers = response.data.documents;

        // Find the customer document with the matching email
        const customer = customers.find(
          (doc) => doc.fields.Email.stringValue === loggedInUser
        );

        if (customer) {
          setCustomerData(customer.fields);
          const fetchedCustomerID = customer.fields.CustomerID.integerValue;
          setCustomerID(fetchedCustomerID); // Set CustomerID
          console.log('Customer ID:', fetchedCustomerID); // Log for debugging
        } else {
          setError("Customer not found. Please log in again.");
        }
      } catch (error) {
        console.error("Error fetching customer data", error);
        setError("An error occurred while fetching customer data.");
      }
    };

    if (loggedInUser) {
      fetchCustomerData();
    } else {
      navigate("/login");
    }
  }, [loggedInUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for amount limit
    const amountValue = parseInt(amount, 10);
    if (amountValue > 50000) {
      alert("Transaction limit exceeded. Please enter an amount less than 50,000.");
      return;
    }

    if (!fromAccount || !toAccount || !recipientName || !ifscCode || !amount) {
      setError("Please fill in all fields.");
      return;
    }

    // Construct the transaction object for the sender
    const transactionDataSender = {
      FromAccountNumber: { stringValue: fromAccount },
      ToAccountNumber: { stringValue: toAccount },
      RecipientName: { stringValue: recipientName }, // Entered by user
      IFSC: { stringValue: ifscCode },
      Amount: { stringValue: amount },
      Debited: { booleanValue: true }, // Debited field true for sender
      Timestamp: { stringValue: new Date().toISOString() } // Generate current timestamp
    };

    // Construct the transaction object for the receiver
    const transactionDataReceiver = {
      FromAccountNumber: { stringValue: fromAccount },
      ToAccountNumber: { stringValue: toAccount },
      RecipientName: { stringValue: recipientName },
      IFSC: { stringValue: ifscCode },
      Amount: { stringValue: amount },
      Debited: { booleanValue: false }, // Debited field false for receiver
      Timestamp: { stringValue: new Date().toISOString() } // Generate current timestamp
    };

    try {
      // Check if the customerID is available before making the request
      if (!customerID) {
        console.error("CustomerID is not available.");
        setError("Failed to retrieve customer information. Please try again.");
        return;
      }

      // Store transaction details for the sender
      await storeTransactionForCustomer(customerID, transactionDataSender, true);

      // Now search for the receiver's document in the "Customers" collection
      const response = await axios.get(process.env.REACT_APP_CUSTOMERS_URL);
      const customers = response.data.documents;

      // Find the customer document with the matching ToAccountNumber
      const receiver = customers.find(
        (doc) => doc.fields.Accounts.arrayValue.values.some(
          account => account.mapValue.fields.AccountNumber.stringValue === toAccount
        )
      );

      if (!receiver) {
        setError("Receiver not found. Please check the To Account Number.");
        return;
      }

      // Fetch the receiver's CustomerID
      const receiverCustomerID = receiver.fields.CustomerID.integerValue;
      console.log('Receiver Customer ID:', receiverCustomerID);

      // Store transaction details for the receiver
      await storeTransactionForCustomer(receiverCustomerID, transactionDataReceiver, false);

      // Update the balances for both the sender and the receiver
      await updateCustomerBalance(customerID, fromAccount, -amount); // Deduct from sender
      await updateCustomerBalance(receiverCustomerID, toAccount, amount); // Add to receiver

      alert("Payment processed and recorded for both sender and receiver successfully!");
      navigate("/customer-page");

    } catch (error) {
      console.error("Error processing transaction", error);
      setError("An error occurred while processing the transaction.");
    }
  };

  // Function to store a transaction for a customer (sender/receiver)
  const storeTransactionForCustomer = async (customerID, transactionData, isSender) => {
    try {
      let transactionsResponse;

      // First, check if the document exists for the customerID
      try {
        transactionsResponse = await axios.get(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Document not found, so create a new one
          console.log(`Document not found for ${isSender ? 'sender' : 'receiver'}. Creating a new document...`);

          // Create a new document with the initial transaction
          await axios.post(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}?documentId=${customerID}`, {
            fields: {
              Transactions: {
                arrayValue: {
                  values: [{ mapValue: { fields: transactionData } }]
                }
              }
            }
          });

          return;
        } else {
          // Some other error occurred
          throw error;
        }
      }

      // If document exists, proceed to update it
      console.log(`Transactions response for ${isSender ? 'sender' : 'receiver'}:`, transactionsResponse);

      // Get existing transactions or initialize an empty array
      const existingTransactions = transactionsResponse.data.fields.Transactions?.arrayValue?.values || [];

      // Add the new transaction to the array
      const updatedTransactions = [...existingTransactions, { mapValue: { fields: transactionData } }];

      // Update the Transactions document in Firestore
      await axios.patch(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`, {
        fields: {
          Transactions: {
            arrayValue: {
              values: updatedTransactions
            }
          }
        }
      });

    } catch (error) {
      console.error(`Error storing transaction for ${isSender ? 'sender' : 'receiver'}`, error);
      throw error;
    }
  };

  // Function to update the customer's balance
  const updateCustomerBalance = async (customerID, accountNumber, amountDelta) => {
    try {
      // Fetch the current customer document
      const customerResponse = await axios.get(`${process.env.REACT_APP_CUSTOMERS_URL}/${customerID}`);

      // Get the account to update and all other fields (inside and outside Accounts)
      const accounts = customerResponse.data.fields.Accounts.arrayValue.values;
      const otherFields = { ...customerResponse.data.fields }; // Make a copy of all fields
      delete otherFields.Accounts; // Remove Accounts from other fields

      // Find the account within Accounts array to update its balance
      const updatedAccounts = accounts.map(account => {
        if (account.mapValue.fields.AccountNumber.stringValue === accountNumber) {
          const currentBalance = parseInt(account.mapValue.fields.Balance.integerValue, 10);
          const newBalance = currentBalance + parseInt(amountDelta, 10);

          // Return the account with updated balance while keeping all other fields intact
          return {
            mapValue: {
              fields: {
                ...account.mapValue.fields, // Preserve all other fields
                Balance: { integerValue: newBalance } // Update only the Balance field
              }
            }
          };
        }
        return account; // Return other accounts unchanged
      });

      // Update only the Accounts array without affecting other fields in the document
      await axios.patch(`${process.env.REACT_APP_CUSTOMERS_URL}/${customerID}`, {
        fields: {
          Accounts: {
            arrayValue: {
              values: updatedAccounts
            }
          },
          ...otherFields // Ensure all other fields outside of Accounts are preserved
        }
      });

      console.log(`Customer ${customerID}'s balance updated successfully.`);
    } catch (error) {
      console.error("Error updating balance:", error);
      throw error;
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h2>Send Money</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* From Account Number */}
          <div className="form-group">
            <label htmlFor="fromAccount">From Account Number:</label>
            <select
              id="fromAccount"
              value={fromAccount}
              onChange={(e) => setFromAccount(e.target.value)}
              required
            >
              <option value="">Select an Account</option>
              {customerData?.Accounts?.arrayValue?.values?.map((account, index) => (
                <option
                  key={index}
                  value={account.mapValue.fields.AccountNumber.stringValue}
                >
                  {account.mapValue.fields.AccountNumber.stringValue}
                </option>
              ))}
            </select>
          </div>

          {/* To Account Number */}
          <div className="form-group">
            <label htmlFor="toAccount">To Account Number:</label>
            <input
              type="text"
              id="toAccount"
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
              required
            />
          </div>

          {/* Recipient Name */}
          <div className="form-group">
            <label htmlFor="recipientName">Recipient Name:</label>
            <input
              type="text"
              id="recipientName"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              required
            />
          </div>

          {/* IFSC Code */}
          <div className="form-group">
            <label htmlFor="ifscCode">IFSC Code:</label>
            <input
              type="text"
              id="ifscCode"
              value={ifscCode}
              onChange={(e) => setIfscCode(e.target.value)}
              required
            />
          </div>

          {/* Amount */}
          <div className="form-group">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="form-group">
            <button type="submit">Send Money</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
