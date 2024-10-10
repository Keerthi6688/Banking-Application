// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import './CustomerPage.css';

// const CustomerPage = () => {
//   const navigate = useNavigate();
//   const [customerData, setCustomerData] = useState(null);
//   const [error, setError] = useState("");
//   const [showBalance, setShowBalance] = useState(false);
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

//   // Function to handle logout
//   const handleLogout = () => {
//     sessionStorage.removeItem("loggedInUser");
//     navigate("/login");
//   };

//   // Function to toggle balance visibility
//   const handleViewBalance = () => {
//     setShowBalance(!showBalance);
//   };

//   return (
//     <div className="customer-page">
//       <nav className="navbar">
//         <div className="navbar-title">BANK OF INDIA</div>
//         <div className="navbar-actions">
//           <span className="navbar-profile" onClick={() => navigate('/profile')}>Profile</span> {/* Redirect to Profile page */}
//           <span className="navbar-transactions">Transactions</span>
//           <span className="navbar-logout" onClick={handleLogout}>Logout</span>
//         </div>
//         <div className="navbar-email">{loggedInUser}</div>
//       </nav>

//       <div className="customer-content">
//         {error && <p className="error-message">{error}</p>}
//         {customerData && (
//           <>
//             <h1>Welcome, {customerData.Name.stringValue}!</h1>
//             <h3>Your Account Details:</h3>
//             <div className="account-details-box">
//               <h4>Account Type: {customerData.Accounts.arrayValue.values[0].mapValue.fields.AccountType.stringValue}</h4>
//               <p>Account Number: {customerData.Accounts.arrayValue.values[0].mapValue.fields.AccountNumber.stringValue}</p>
//               <button className="view-balance-button" onClick={handleViewBalance}>
//                 View Balance
//               </button>
//               {showBalance && (
//                 <div className="balance-box">
//                   <p>Balance: ₹{customerData.Accounts.arrayValue.values[0].mapValue.fields.Balance.stringValue}</p>
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CustomerPage;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import './CustomerPage.css';

// const CustomerPage = () => {
//   const navigate = useNavigate();
//   const [customerData, setCustomerData] = useState(null);
//   const [error, setError] = useState("");
//   const [showBalance, setShowBalance] = useState(false);
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

//   // Function to handle logout
//   const handleLogout = () => {
//     sessionStorage.removeItem("loggedInUser");
//     navigate("/login");
//   };

//   // Function to toggle balance visibility
//   const handleViewBalance = () => {
//     setShowBalance(!showBalance);
//   };

//   // Function to handle redirect to Payment page
//   const handleSendMoney = () => {
//     navigate("/payment");
//   };

//     // Function to handle redirect to Loans page
//     const handleLoans = () => {
//         navigate("/loans");
//       };
    
//       // Function to handle redirect to Services page
//       const handleServices = () => {
//         navigate("/services");
//       };

//   return (
//     <div className="customer-page">
//       <nav className="navbar">
//         <div className="navbar-title">BANK OF INDIA</div>
//         <div className="navbar-actions">
//           <span className="navbar-profile" onClick={() => navigate('/profile')}>Profile</span> {/* Redirect to Profile page */}
//           <span className="navbar-transactions">Transactions</span>
//           <span className="navbar-logout" onClick={handleLogout}>Logout</span>
//         </div>
//         <div className="navbar-email">{loggedInUser}</div>
//       </nav>

//       <div className="customer-content">
//         {error && <p className="error-message">{error}</p>}
//         {customerData && (
//           <>
//             <h1>Welcome, {customerData.Name.stringValue}!</h1>
//             <div className="account-details-box">
//               <h4>Account Type: {customerData.Accounts.arrayValue.values[0].mapValue.fields.AccountType.stringValue}</h4>
//               <p>Account Number: {customerData.Accounts.arrayValue.values[0].mapValue.fields.AccountNumber.stringValue}</p>
//               <button className="view-balance-button" onClick={handleViewBalance}>
//                 View Balance
//               </button>
//               {showBalance && (
//                 <div className="balance-box">
//                   <p>Balance: ₹{customerData.Accounts.arrayValue.values[0].mapValue.fields.Balance.integerValue}</p>
//                 </div>
//               )}
//             </div>
            
//             <div className="other-container">
//             {/* Send Money Container */}
//             <div className="send-money-container" onClick={handleSendMoney}>
//               <h2>Send Money</h2>
//             </div>

//               {/* Loans Container */}
//               <div className="loans-container" onClick={handleLoans}>
//               <h2>Loans</h2>
//             </div>

//             {/* Services Container */}
//             <div className="services-container" onClick={handleServices}>
//               <h2>Services</h2>
//             </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CustomerPage;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import './CustomerPage.css';

// const CustomerPage = () => {
//   const navigate = useNavigate();
//   const [customerData, setCustomerData] = useState(null);
//   const [error, setError] = useState("");
//   const [showBalance, setShowBalance] = useState(false);
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

//   // Function to handle logout
//   const handleLogout = () => {
//     sessionStorage.removeItem("loggedInUser");
//     navigate("/login");
//   };

//   // Function to toggle balance visibility
//   const handleViewBalance = () => {
//     setShowBalance(!showBalance);
//   };

//   // Function to handle redirect to Payment page
//   const handleSendMoney = () => {
//     navigate("/payment");
//   };

//   // Function to handle redirect to Loans page
//   const handleLoans = () => {
//     navigate("/loans");
//   };
    
//   // Function to handle redirect to Services page
//   const handleServices = () => {
//     navigate("/services");
//   };

//   // Function to handle redirect to Transactions page
//   const handleTransactions = () => {
//     navigate("/transactions"); // Navigate to Transactions page
//   };

//   return (
//     <div className="customer-page">
//       <nav className="navbar">
//         <div className="navbar-title">BANK OF INDIA</div>
//         <div className="navbar-actions">
//           <span className="navbar-profile" onClick={() => navigate('/profile')}>Profile</span> {/* Redirect to Profile page */}
//           <span className="navbar-transactions" onClick={handleTransactions}>Transactions</span> {/* Redirect to Transactions page */}
//           <span className="navbar-logout" onClick={handleLogout}>Logout</span>
//         </div>
//         <div className="navbar-email">{loggedInUser}</div>
//       </nav>

//       <div className="customer-content">
//         {error && <p className="error-message">{error}</p>}
//         {customerData && (
//           <>
//             <h1>Welcome, {customerData.Name.stringValue}!</h1>
//             <div className="account-details-box">
//               <h4>Account Type: {customerData.Accounts.arrayValue.values[0].mapValue.fields.AccountType.stringValue}</h4>
//               <p>Account Number: {customerData.Accounts.arrayValue.values[0].mapValue.fields.AccountNumber.stringValue}</p>
//               <button className="view-balance-button" onClick={handleViewBalance}>
//                 View Balance
//               </button>
//               {showBalance && (
//                 <div className="balance-box">
//                   <p>Balance: ₹{customerData.Accounts.arrayValue.values[0].mapValue.fields.Balance.integerValue}</p>
//                 </div>
//               )}
//             </div>
            
//             <div className="other-container">
//               {/* Send Money Container */}
//               <div className="send-money-container" onClick={handleSendMoney}>
//                 <h2>Send Money</h2>
//               </div>

//               {/* Loans Container */}
//               <div className="loans-container" onClick={handleLoans}>
//                 <h2>Loans</h2>
//               </div>

//               {/* Services Container */}
//               <div className="services-container" onClick={handleServices}>
//                 <h2>Services</h2>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CustomerPage;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import './CustomerPage.css';

// const CustomerPage = () => {
//   const navigate = useNavigate();
//   const [customerData, setCustomerData] = useState(null);
//   const [error, setError] = useState("");
//   const [showBalance, setShowBalance] = useState(false);
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

//   // Function to handle logout
//   const handleLogout = () => {
//     sessionStorage.removeItem("loggedInUser");
//     navigate("/login");
//   };

//   // Function to toggle balance visibility
//   const handleViewBalance = () => {
//     setShowBalance(!showBalance);
//   };

//   // Function to handle redirect to Payment page
//   const handleSendMoney = () => {
//     navigate("/payment");
//   };

//   // // Function to handle redirect to Send Money to Other Banks page
//   // const handleSendMoneyToOtherBanks = () => {
//   //   navigate("/other-banks-payment"); // You would define this route for handling other bank payments
//   // };

//   // Click handler to navigate to PaymentOther.js
//   const handleSendMoneyToOtherBanks = () => {
//     navigate("/payment-other");
//   };

//   // Click handler to navigate to LoadTransactions.js
//   const handleLoadTransactionsFromOtherBanks = () => {
//     navigate("/load-transactions");
//   };



//   // Function to handle redirect to Loans page
//   const handleLoans = () => {
//     navigate("/loans");
//   };
    
//   // Function to handle redirect to Services page
//   const handleServices = () => {
//     navigate("/services");
//   };

//   // Function to handle redirect to Transactions page
//   const handleTransactions = () => {
//     navigate("/transactions"); // Navigate to Transactions page
//   };

//   return (
//     <div className="customer-page">
//       <nav className="navbar">
//         <div className="navbar-title">BANK OF INDIA</div>
//         <div className="navbar-actions">
//           <span className="navbar-profile" onClick={() => navigate('/profile')}>Profile</span> {/* Redirect to Profile page */}
//           <span className="navbar-transactions" onClick={handleTransactions}>Transactions</span> {/* Redirect to Transactions page */}
//           <span className="navbar-logout" onClick={handleLogout}>Logout</span>
//         </div>
//         <div className="navbar-email">{loggedInUser}</div>
//       </nav>

//       <div className="customer-content">
//         {error && <p className="error-message">{error}</p>}
//         {customerData && (
//           <>
//             <h1>Welcome, {customerData.Name.stringValue}!</h1>
//             <div className="account-details-box">
//               <h4>Account Type: {customerData.Accounts.arrayValue.values[0].mapValue.fields.AccountType.stringValue}</h4>
//               <p>Account Number: {customerData.Accounts.arrayValue.values[0].mapValue.fields.AccountNumber.stringValue}</p>
//               <button className="view-balance-button" onClick={handleViewBalance}>
//                 View Balance
//               </button>
//               {showBalance && (
//                 <div className="balance-box">
//                   <p>Balance: ₹{customerData.Accounts.arrayValue.values[0].mapValue.fields.Balance.integerValue}</p>
//                 </div>
//               )}
//             </div>
            
//             <div className="other-container">
//               {/* Send Money Container */}
//               <div className="send-money-container" onClick={handleSendMoney}>
//                 <h2>Send Money</h2>
//               </div>

//               {/* New: Send Money to Other Banks Container */}
//               <div className="send-money-other-banks-container" onClick={handleSendMoneyToOtherBanks}>
//                 <h2>Send Money to Other Banks</h2>
//               </div>

//               <div className="send-money-other-banks-container" onClick={handleLoadTransactionsFromOtherBanks}>
//                 <h2>Load transaction from other banks</h2>
//               </div>
//               {/* Loans Container */}
//               <div className="loans-container" onClick={handleLoans}>
//                 <h2>Loans</h2>
//               </div>

//               {/* Services Container */}
//               <div className="services-container" onClick={handleServices}>
//                 <h2>Services</h2>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CustomerPage;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import LoadTransactions from "./LoadTransactions"; // Import LoadTransactions function
// import './CustomerPage.css';

// const CustomerPage = () => {
//   const navigate = useNavigate();
//   const [customerData, setCustomerData] = useState(null);
//   const [error, setError] = useState("");
//   const [showBalance, setShowBalance] = useState(false);
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

//   // Function to handle logout
//   const handleLogout = () => {
//     sessionStorage.removeItem("loggedInUser");
//     navigate("/login");
//   };

//   // Function to toggle balance visibility
//   const handleViewBalance = () => {
//     setShowBalance(!showBalance);
//   };

//   // Function to handle redirect to Payment page
//   const handleSendMoney = () => {
//     navigate("/payment");
//   };

//   // Function to handle redirect to Send Money to Other Banks page
//   const handleSendMoneyToOtherBanks = () => {
//     navigate("/payment-other");
//   };

//   // Function to handle Load Transactions from Other Banks
//   const handleLoadTransactionsFromOtherBanks = async () => {
//     try {
//       await LoadTransactions(); // Call LoadTransactions function directly
//       alert("Transactions from other banks loaded successfully.");
//     } catch (error) {
//       console.error("Error loading transactions:", error);
//       alert("Error loading transactions. Please try again.");
//     }
//   };

//   // Function to handle redirect to Loans page
//   const handleLoans = () => {
//     navigate("/loans");
//   };
    
//   // Function to handle redirect to Services page
//   const handleServices = () => {
//     navigate("/services");
//   };

//   // Function to handle redirect to Transactions page
//   const handleTransactions = () => {
//     navigate("/transactions"); // Navigate to Transactions page
//   };

//   return (
//     <div className="customer-page">
//       <nav className="navbar">
//         <div className="navbar-title">BANK OF INDIA</div>
//         <div className="navbar-actions">
//           <span className="navbar-profile" onClick={() => navigate('/profile')}>Profile</span> {/* Redirect to Profile page */}
//           <span className="navbar-transactions" onClick={handleTransactions}>Transactions</span> {/* Redirect to Transactions page */}
//           <span className="navbar-logout" onClick={handleLogout}>Logout</span>
//         </div>
//         <div className="navbar-email">{loggedInUser}</div>
//       </nav>

//       <div className="customer-content">
//         {error && <p className="error-message">{error}</p>}
//         {customerData && (
//           <>
//             <h1>Welcome, {customerData.Name.stringValue}!</h1>
//             <div className="account-details-box">
//               <h4>Account Type: {customerData.Accounts.arrayValue.values[0].mapValue.fields.AccountType.stringValue}</h4>
//               <p>Account Number: {customerData.Accounts.arrayValue.values[0].mapValue.fields.AccountNumber.stringValue}</p>
//               <button className="view-balance-button" onClick={handleViewBalance}>
//                 View Balance
//               </button>
//               {showBalance && (
//                 <div className="balance-box">
//                   <p>Balance: ₹{customerData.Accounts.arrayValue.values[0].mapValue.fields.Balance.integerValue}</p>
//                 </div>
//               )}
//             </div>
            
//             <div className="other-container">
//               {/* Send Money Container */}
//               <div className="send-money-container" onClick={handleSendMoney}>
//                 <h2>Send Money</h2>
//               </div>

//               {/* New: Send Money to Other Banks Container */}
//               <div className="send-money-other-banks-container" onClick={handleSendMoneyToOtherBanks}>
//                 <h2>Send Money to Other Banks</h2>
//               </div>

//               {/* Load Transactions from Other Banks */}
//               <div className="send-money-other-banks-container" onClick={handleLoadTransactionsFromOtherBanks}>
//                 <h2>Load Transactions from Other Banks</h2>
//               </div>

//               {/* Loans Container */}
//               <div className="loans-container" onClick={handleLoans}>
//                 <h2>Loans</h2>
//               </div>

//               {/* Services Container */}
//               {/* <div className="services-container" onClick={handleServices}>
//                 <h2>Services</h2>
//               </div> */}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CustomerPage;





import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadTransactions from "./LoadTransactions"; // Import LoadTransactions function
import './CustomerPage.css';

const CustomerPage = () => {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState(null);
  const [error, setError] = useState("");
  const [showBalance, setShowBalance] = useState(false);
  const [showLoanForm, setShowLoanForm] = useState(false); // State to show/hide the loan form
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const loggedInUser = sessionStorage.getItem("loggedInUser");

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_CUSTOMERS_URL);
        const customers = response.data.documents;
        const customer = customers.find(
          (doc) => doc.fields.Email.stringValue === loggedInUser
        );

        if (customer) {
          setCustomerData(customer.fields);
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

  const handleLogout = () => {
    sessionStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const handleViewBalance = () => {
    setShowBalance(!showBalance);
  };

  const handleSendMoney = () => {
    navigate("/payment");
  };

  const handleSendMoneyToOtherBanks = () => {
    navigate("/payment-other");
  };

  const handleLoadTransactionsFromOtherBanks = async () => {
    try {
      await LoadTransactions();
      alert("Transactions from other banks loaded successfully.");
    } catch (error) {
      console.error("Error loading transactions:", error);
      alert("Error loading transactions. Please try again.");
    }
  };

  // const handleLoans = () => {
  //   setShowLoanForm(true); // Show the loan form when the button is clicked
  // };

  // CustomerPage.js
const handleLoans = () => {
  navigate("/loans"); // Navigate to Loans page
};


  const handleRequestLoan = async () => {
    try {
      // Here you can make an API call to store the loan request in your backend
      const loanRequest = {
        amount: loanAmount,
        purpose: loanPurpose,
        email: loggedInUser, // Attach the logged-in user's email for identification
      };
      await axios.post(process.env.REACT_APP_LOAN_REQUESTS_URL, loanRequest);
      alert("Loan request submitted successfully.");
      setShowLoanForm(false); // Close the form after submission
      setLoanAmount("");
      setLoanPurpose("");
    } catch (error) {
      console.error("Error submitting loan request", error);
      alert("Failed to submit loan request. Please try again.");
    }
  };

  // const handleServices = () => {
  //   navigate("/services");
  // };

  const handleTransactions = () => {
    navigate("/transactions");
  };

  return (
    <div className="customer-page">
      <nav className="navbar">
        <div className="navbar-title">BANK OF INDIA</div>
        <div className="navbar-actions">
          <span className="navbar-profile" onClick={() => navigate('/profile')}>Profile</span>
          <span className="navbar-transactions" onClick={handleTransactions}>Transactions</span>
          <span className="navbar-logout" onClick={handleLogout}>Logout</span>
        </div>
        <div className="navbar-email">{loggedInUser}</div>
      </nav>

      <div className="customer-content">
        {error && <p className="error-message">{error}</p>}
        {customerData && (
          <>
            <h1>Welcome, {customerData.Name.stringValue}!</h1>
            <div className="account-details-box">
              <h4>Account Type: {customerData.Accounts.arrayValue.values[0].mapValue.fields.AccountType.stringValue}</h4>
              <p>Account Number: {customerData.Accounts.arrayValue.values[0].mapValue.fields.AccountNumber.stringValue}</p>
              <button className="view-balance-button" onClick={handleViewBalance}>
                View Balance
              </button>
              {showBalance && (
                <div className="balance-box">
                  <p>Balance: ₹{customerData.Accounts.arrayValue.values[0].mapValue.fields.Balance.integerValue}</p>
                </div>
              )}
            </div>
            
            <div className="other-container">
              <div className="send-money-container" onClick={handleSendMoney}>
                <h2>Send Money</h2>
              </div>

              <div className="send-money-other-banks-container" onClick={handleSendMoneyToOtherBanks}>
                <h2>Send Money to Other Banks</h2>
              </div>

              <div className="send-money-other-banks-container" onClick={handleLoadTransactionsFromOtherBanks}>
                <h2>Load Transactions from Other Banks</h2>
              </div>

              {/* Loans Container */}
              <div className="loans-container" onClick={handleLoans}>
                <h2>Loans</h2>
              </div>

              {/* Loan Form */}
              {showLoanForm && (
                <div className="loan-form">
                  <h3>Loan Request Form</h3>
                  <label>Loan Amount:</label>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    required
                  />
                  <label>Loan Purpose:</label>
                  <textarea
                    value={loanPurpose}
                    onChange={(e) => setLoanPurpose(e.target.value)}
                    required
                  />
                  <button onClick={handleRequestLoan}>Request Loan</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerPage;
