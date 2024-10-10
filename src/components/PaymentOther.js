// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import './Payment.css';  // Reuse the same styles

// const PaymentOther = () => {
//   const navigate = useNavigate();
//   const [customerData, setCustomerData] = useState(null);
//   const [fromAccount, setFromAccount] = useState("");
//   const [senderName, setSenderName] = useState("");  // New field for Sender Name
//   const [recipientName, setRecipientName] = useState(""); // Entered by user
//   const [ifscCode, setIfscCode] = useState("");
//   const [toAccount, setToAccount] = useState("");
//   const [amount, setAmount] = useState("");
//   const [customerID, setCustomerID] = useState("");
//   const [error, setError] = useState("");
//   const loggedInUser = sessionStorage.getItem("loggedInUser");

//   useEffect(() => {
//     const fetchCustomerData = async () => {
//       try {
//         // Fetch all customers from Firestore
//         const response = await axios.get(process.env.REACT_APP_CUSTOMERS_URL);
//         const customers = response.data.documents;

//         // Find the customer document with the matching email
//         const customer = customers.find(
//           (doc) => doc.fields.Email.stringValue === loggedInUser
//         );

//         if (customer) {
//           setCustomerData(customer.fields);
//           setCustomerID(customer.fields.CustomerID.integerValue); // Set CustomerID
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

//     // Check for amount limit
//     const amountValue = parseInt(amount, 10);
//     if (amountValue > 50000) {
//       alert("Transaction limit exceeded. Please enter an amount less than 50,000.");
//       return;
//     }

//     if (!fromAccount || !toAccount || !senderName || !recipientName || !ifscCode || !amount) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     // Construct the transaction object for the sender
//     const transactionData = {
//       FromAccountNumber: { stringValue: fromAccount },
//       ToAccountNumber: { stringValue: toAccount },
//       RecipientName: { stringValue: recipientName }, // Entered by user
//       IFSC: { stringValue: ifscCode },
//       Amount: { stringValue: amount },
//       Debited: { booleanValue: true }, // Debited field true for sender
//       Timestamp: { stringValue: new Date().toISOString() } // Generate current timestamp
//     };

//     try {
//       // Check if the customerID is available before making the request
//       if (!customerID) {
//         console.error("CustomerID is not available.");
//         setError("Failed to retrieve customer information. Please try again.");
//         return;
//       }

//       // Store the transaction details for the sender only, no recipient-side transaction in this case
//       await storeTransactionForCustomer(customerID, transactionData);

//       // Update the sender's balance after sending money
//       await updateCustomerBalance(customerID, fromAccount, -amount);

//       alert("Payment processed successfully to external bank!");
//       navigate("/customer-page");

//     } catch (error) {
//       console.error("Error processing transaction", error);
//       setError("An error occurred while processing the transaction.");
//     }
//   };

//   // Function to store a transaction for a customer (sender)
//   const storeTransactionForCustomer = async (customerID, transactionData) => {
//     try {
//       let transactionsResponse;

//       // First, check if the document exists for the customerID
//       try {
//         transactionsResponse = await axios.get(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`);
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           // Document not found, so create a new one
//           console.log("Document not found for sender. Creating a new document...");

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
//       console.log("Transactions response for sender:", transactionsResponse);

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
//       console.error("Error storing transaction for sender", error);
//       throw error;
//     }
//   };

//   // Function to update the customer's balance
//   const updateCustomerBalance = async (customerID, accountNumber, amountDelta) => {
//     try {
//       // Fetch the current customer document
//       const customerResponse = await axios.get(`${process.env.REACT_APP_CUSTOMERS_URL}/${customerID}`);

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
//       await axios.patch(`${process.env.REACT_APP_CUSTOMERS_URL}/${customerID}`, {
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
//         <h2>Send Money to Other Banks</h2>
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
//             <label htmlFor="toAccount">Recipient's Account Number:</label>
//             <input
//               type="text"
//               id="toAccount"
//               value={toAccount}
//               onChange={(e) => setToAccount(e.target.value)}
//               required
//             />
//           </div>

//            {/* Sender Name */}
//            <div className="form-group">
//             <label htmlFor="senderName">Sender Name:</label>
//             <input
//               type="text"
//               id="senderName"
//               value={senderName}
//               onChange={(e) => setSenderName(e.target.value)}
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

//           <button type="submit" className="submit-button">
//             Send Payment
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PaymentOther;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import './Payment.css';  // Reuse the same styles

// const PaymentOther = () => {
//   const navigate = useNavigate();
//   const [customerData, setCustomerData] = useState(null);
//   const [fromAccount, setFromAccount] = useState("");
//   const [senderName, setSenderName] = useState("");  // New field for Sender Name
//   const [recipientName, setRecipientName] = useState(""); // Entered by user
//   const [ifscCode, setIfscCode] = useState("");
//   const [toAccount, setToAccount] = useState("");
//   const [amount, setAmount] = useState("");
//   const [customerID, setCustomerID] = useState("");
//   const [error, setError] = useState("");
//   const loggedInUser = sessionStorage.getItem("loggedInUser");

//   useEffect(() => {
//     const fetchCustomerData = async () => {
//       try {
//         // Fetch all customers from Firestore
//         const response = await axios.get(process.env.REACT_APP_CUSTOMERS_URL);
//         const customers = response.data.documents;

//         // Find the customer document with the matching email
//         const customer = customers.find(
//           (doc) => doc.fields.Email.stringValue === loggedInUser
//         );

//         if (customer) {
//           setCustomerData(customer.fields);
//           setCustomerID(customer.fields.CustomerID.integerValue); // Set CustomerID
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

//     // Check for amount limit
//     const amountValue = parseInt(amount, 10);
//     if (amountValue > 50000) {
//       alert("Transaction limit exceeded. Please enter an amount less than 50,000.");
//       return;
//     }

//     if (!fromAccount || !toAccount || !senderName || !recipientName || !ifscCode || !amount) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     // Construct the transaction object for the sender
//     const transactionData = {
//       FromAccountNumber: { stringValue: fromAccount },
//       ToAccountNumber: { stringValue: toAccount },
//       RecipientName: { stringValue: recipientName },
//       IFSC: { stringValue: ifscCode },
//       Amount: { stringValue: amount },
//       Debited: { booleanValue: true },
//       Timestamp: { stringValue: new Date().toISOString() }
//     };

//     try {
//       if (!customerID) {
//         console.error("CustomerID is not available.");
//         setError("Failed to retrieve customer information. Please try again.");
//         return;
//       }

//       // Store the transaction details for the sender
//       await storeTransactionForCustomer(customerID, transactionData);

//       // Update the sender's balance after sending money
//       await updateCustomerBalance(customerID, fromAccount, -amount);

//       // Store the receiver's transaction in common_db
//       await storeTransactionInCommonDB(ifscCode, fromAccount, senderName, amount);

//       alert("Payment processed successfully to external bank!");
//       navigate("/customer-page");

//     } catch (error) {
//       console.error("Error processing transaction", error);
//       setError("An error occurred while processing the transaction.");
//     }
//   };

//   // Function to store a transaction for a customer (sender)
//   const storeTransactionForCustomer = async (customerID, transactionData) => {
//     try {
//       let transactionsResponse;

//       // First, check if the document exists for the customerID
//       try {
//         transactionsResponse = await axios.get(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`);
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           // Document not found, so create a new one
//           console.log("Document not found for sender. Creating a new document...");

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
//           throw error;
//         }
//       }

//       // If document exists, proceed to update it
//       console.log("Transactions response for sender:", transactionsResponse);

//       const existingTransactions = transactionsResponse.data.fields.Transactions?.arrayValue?.values || [];
//       const updatedTransactions = [...existingTransactions, { mapValue: { fields: transactionData } }];

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
//       console.error("Error storing transaction for sender", error);
//       throw error;
//     }
//   };

//   // Function to update the customer's balance
//   const updateCustomerBalance = async (customerID, accountNumber, amountDelta) => {
//     try {
//       const customerResponse = await axios.get(`${process.env.REACT_APP_CUSTOMERS_URL}/${customerID}`);

//       const accounts = customerResponse.data.fields.Accounts.arrayValue.values;
//       const otherFields = { ...customerResponse.data.fields };
//       delete otherFields.Accounts;

//       const updatedAccounts = accounts.map(account => {
//         if (account.mapValue.fields.AccountNumber.stringValue === accountNumber) {
//           const currentBalance = parseInt(account.mapValue.fields.Balance.integerValue, 10);
//           const newBalance = currentBalance + parseInt(amountDelta, 10);

//           return {
//             mapValue: {
//               fields: {
//                 ...account.mapValue.fields,
//                 Balance: { integerValue: newBalance }
//               }
//             }
//           };
//         }
//         return account; // Return other accounts unchanged
//       });

//       await axios.patch(`${process.env.REACT_APP_CUSTOMERS_URL}/${customerID}`, {
//         fields: {
//           Accounts: {
//             arrayValue: {
//               values: updatedAccounts
//             }
//           },
//           ...otherFields
//         }
//       });

//       console.log(`Customer ${customerID}'s balance updated successfully.`);
//     } catch (error) {
//       console.error("Error updating balance:", error);
//       throw error;
//     }
//   };

//   // Function to store the receiver's transaction in common_db
//   const storeTransactionInCommonDB = async (ifscCode, senderAccountNumber, senderName, amount) => {
//     try {
//       // Retrieve the document with the matching IFSC code
//       const response = await axios.get(`${process.env.REACT_APP_COMMON_DB_URL}/${ifscCode}`);
      
//       if (response.data) {
//         const documentID = response.data.name.split('/').pop(); // Get the document ID from the response

//         const transactionDetails = {
//           sender_AccNo: senderAccountNumber,
//           senderName: senderName,
//           creditAmount: amount,
//           timestamp: { stringValue: new Date().toISOString() } // Current timestamp
//         };

//         // Check if the array for ToAccountNumber already exists in the document
//         const existingArray = response.data.fields[toAccount]?.arrayValue?.values || [];

//         // Push the transaction details into the existing array or create a new one
//         const updatedArray = [...existingArray, { mapValue: { fields: transactionDetails } }];

//         // Update the document in common_db
//         await axios.patch(`${process.env.REACT_APP_COMMON_DB_URL}/${documentID}`, {
//           fields: {
//             [toAccount]: {
//               arrayValue: {
//                 values: updatedArray
//               }
//             }
//           }
//         });
//       } else {
//         console.error("No document found for the provided IFSC code.");
//       }

//     } catch (error) {
//       console.error("Error storing transaction in common_db", error);
//       throw error;
//     }
//   };

//   return (
//     <div className="payment-page">
//       <div className="payment-container">
//         <h2>Send Money to Other Banks</h2>
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
//               {customerData?.Accounts?.arrayValue?.values.map((account, index) => (
//                 <option key={index} value={account.mapValue.fields.AccountNumber.stringValue}>
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

//           {/* Sender Name */}
//           <div className="form-group">
//             <label htmlFor="senderName">Sender Name:</label>
//             <input
//               type="text"
//               id="senderName"
//               value={senderName}
//               onChange={(e) => setSenderName(e.target.value)}
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

//           <button type="submit">Send Money</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PaymentOther;


//finalllll

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Payment.css';  // Reuse the same styles

const PaymentOther = () => {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState(null);
  const [fromAccount, setFromAccount] = useState("");
  const [senderName, setSenderName] = useState("");  // New field for Sender Name
  const [recipientName, setRecipientName] = useState(""); // Entered by user
  const [ifscCode, setIfscCode] = useState("");
  const [toAccount, setToAccount] = useState("");
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
          setCustomerID(customer.fields.CustomerID.integerValue); // Set CustomerID
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

    if (!fromAccount || !toAccount || !senderName || !recipientName || !ifscCode || !amount) {
      setError("Please fill in all fields.");
      return;
    }

    // Construct the transaction object for the sender
    const transactionData = {
      FromAccountNumber: { stringValue: fromAccount },
      ToAccountNumber: { stringValue: toAccount },
      RecipientName: { stringValue: recipientName },
      IFSC: { stringValue: ifscCode },
      Amount: { stringValue: amount },
      Debited: { booleanValue: true },
      Timestamp: { stringValue: new Date().toISOString() }
    };

    try {
      if (!customerID) {
        console.error("CustomerID is not available.");
        setError("Failed to retrieve customer information. Please try again.");
        return;
      }

      // Store the transaction details for the sender
      await storeTransactionForCustomer(customerID, transactionData);

      // Update the sender's balance after sending money
      await updateCustomerBalance(customerID, fromAccount, -amount);

      // Store the receiver's transaction in common_db
      await storeTransactionInCommonDB(ifscCode, fromAccount, senderName, amount);

      alert("Payment processed successfully to external bank!");
      navigate("/customer-page");

    } catch (error) {
      console.error("Error processing transaction", error);
      setError("An error occurred while processing the transaction.");
    }
  };

  // Function to store a transaction for a customer (sender)
  const storeTransactionForCustomer = async (customerID, transactionData) => {
    try {
      let transactionsResponse;

      // First, check if the document exists for the customerID
      try {
        transactionsResponse = await axios.get(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Document not found, so create a new one
          console.log("Document not found for sender. Creating a new document...");

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
          throw error;
        }
      }

      // If document exists, proceed to update it
      console.log("Transactions response for sender:", transactionsResponse);

      const existingTransactions = transactionsResponse.data.fields.Transactions?.arrayValue?.values || [];
      const updatedTransactions = [...existingTransactions, { mapValue: { fields: transactionData } }];

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
      console.error("Error storing transaction for sender", error);
      throw error;
    }
  };

  // Function to update the customer's balance
  const updateCustomerBalance = async (customerID, accountNumber, amountDelta) => {
    try {
      const customerResponse = await axios.get(`${process.env.REACT_APP_CUSTOMERS_URL}/${customerID}`);

      const accounts = customerResponse.data.fields.Accounts.arrayValue.values;
      const otherFields = { ...customerResponse.data.fields };
      delete otherFields.Accounts;

      const updatedAccounts = accounts.map(account => {
        if (account.mapValue.fields.AccountNumber.stringValue === accountNumber) {
          const currentBalance = parseInt(account.mapValue.fields.Balance.integerValue, 10);
          const newBalance = currentBalance + parseInt(amountDelta, 10);

          return {
            mapValue: {
              fields: {
                ...account.mapValue.fields,
                Balance: { integerValue: newBalance }
              }
            }
          };
        }
        return account; // Return other accounts unchanged
      });

      await axios.patch(`${process.env.REACT_APP_CUSTOMERS_URL}/${customerID}`, {
        fields: {
          Accounts: {
            arrayValue: {
              values: updatedAccounts
            }
          },
          ...otherFields
        }
      });

      console.log(`Customer ${customerID}'s balance updated successfully.`);
    } catch (error) {
      console.error("Error updating balance:", error);
      throw error;
    }
  };

  // Function to store the receiver's transaction in common_db
  const storeTransactionInCommonDB = async (ifscCode, senderAccountNumber, senderName, amount) => {
    try {
      // Retrieve the document with the matching IFSC code
      const response = await axios.get(`${process.env.REACT_APP_COMMON_DB_URL}/${ifscCode}`);

      if (response.data) {
        const documentID = response.data.name.split('/').pop(); // Get the document ID from the response

        const transactionDetails = {
          senderAccountNumber: { stringValue: senderAccountNumber },
        //   senderName: { stringValue: senderName },
          creditAmount: { integerValue: parseFloat(amount) },
        //   timestamp: { stringValue: new Date().toISOString() } // Current timestamp
        };

        // Check if the array for ToAccountNumber already exists in the document
        const existingArray = response.data.fields[toAccount]?.arrayValue?.values || [];

        // Push the transaction details into the existing array or create a new one
        const updatedArray = [...existingArray, { mapValue: { fields: transactionDetails } }];

        // Update the document in common_db
        await axios.patch(`${process.env.REACT_APP_COMMON_DB_URL}/${documentID}`, {
          fields: {
            [toAccount]: {
              arrayValue: {
                values: updatedArray
              }
            }
          }
        });

        console.log("Transaction stored in common_db successfully for:", toAccount);
      } else {
        console.error("No document found for the provided IFSC code.");
      }

    } catch (error) {
      console.error("Error storing transaction in common_db", error);
      throw error;
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h2>Send Money to Other Banks</h2>
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
              {customerData?.Accounts?.arrayValue?.values.map((account, index) => (
                <option key={index} value={account.mapValue.fields.AccountNumber.stringValue}>
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

          {/* Sender Name */}
          <div className="form-group">
            <label htmlFor="senderName">Sender Name:</label>
            <input
              type="text"
              id="senderName"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
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
              min="1"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn">Send Money</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentOther;
