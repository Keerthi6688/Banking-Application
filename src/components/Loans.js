// // Loans.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import './Loans.css'; // Import custom CSS for styling if needed

// const Loans = () => {
//   const [loanAmount, setLoanAmount] = useState("");
//   const [loanPurpose, setLoanPurpose] = useState("");
//   const [message, setMessage] = useState("");

//   const handleRequestLoan = async () => {
//     try {
//       // Here, you would send the loan data to your Firestore or backend API
//       const loanData = {
//         loanAmount,
//         loanPurpose,
//         customerID: sessionStorage.getItem('CustomerID'), // Assuming CustomerID is stored in sessionStorage
//       };
      
//       // Call API to save loan request (adjust endpoint accordingly)
//       const response = await axios.post(process.env.REACT_APP_LOAN_REQUEST_URL, loanData);
      
//       if (response.status === 200) {
//         setMessage("Loan request submitted successfully!");
//       } else {
//         setMessage("Failed to submit loan request. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error submitting loan request", error);
//       setMessage("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="loan-form-container">
//       <h1>Request a Loan</h1>
//       <div className="form-group">
//         <label htmlFor="loanAmount">Loan Amount:</label>
//         <input
//           type="number"
//           id="loanAmount"
//           value={loanAmount}
//           onChange={(e) => setLoanAmount(e.target.value)}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="loanPurpose">Loan Purpose:</label>
//         <input
//           type="text"
//           id="loanPurpose"
//           value={loanPurpose}
//           onChange={(e) => setLoanPurpose(e.target.value)}
//           required
//         />
//       </div>
//       <button onClick={handleRequestLoan}>Request Loan</button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default Loans;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Loans.css'; // Import custom CSS for styling if needed

const Loans = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [message, setMessage] = useState("");
  const [customerID, setCustomerID] = useState(null); // To store fetched CustomerID
  const loggedInUser = sessionStorage.getItem('loggedInUser'); // Get logged-in user email

  useEffect(() => {
    // Fetch the CustomerID using the logged-in user's email from the Customers collection
    const fetchCustomerID = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_CUSTOMERS_URL); // API to fetch customers
        const customers = response.data.documents || [];
        
        // Find the customer with the logged-in user's email
        const customer = customers.find(doc => doc.fields.Email.stringValue === loggedInUser);
        
        if (customer) {
          setCustomerID(customer.fields.CustomerID.integerValue); // Set the CustomerID
        } else {
          setMessage("Customer not found.");
        }
      } catch (error) {
        console.error("Error fetching customer data", error);
        setMessage("An error occurred while fetching customer data.");
      }
    };

    if (loggedInUser) {
      fetchCustomerID();
    }
  }, [loggedInUser]);

  const handleRequestLoan = async () => {
    if (!loanAmount || !loanPurpose || !customerID) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      // Loan request data to be stored
      const loanData = {
        fields: {
          LoanAmount: { integerValue: parseInt(loanAmount) }, // Store loan amount as an integer
          LoanPurpose: { stringValue: loanPurpose },
          Status: { booleanValue: false }, // Default status to false
        },
      };

      // API URL to store loan data, with CustomerID as the document ID
      const loanUrl = `${process.env.REACT_APP_LOANS_URL}/${customerID}`;

      // Make an API request to create or update the loan document
      const response = await axios.patch(loanUrl, loanData);

      if (response.status === 200) {
        setMessage("Loan request submitted successfully!");
      } else {
        setMessage("Failed to submit loan request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting loan request", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="loan-form-container">
      <h1>Request a Loan</h1>
      <div className="form-group">
        <label htmlFor="loanAmount">Loan Amount:</label>
        <input
          type="number"
          id="loanAmount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="loanPurpose">Loan Purpose:</label>
        <input
          type="text"
          id="loanPurpose"
          value={loanPurpose}
          onChange={(e) => setLoanPurpose(e.target.value)}
          required
        />
      </div>
      <button onClick={handleRequestLoan}>Request Loan</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Loans;
