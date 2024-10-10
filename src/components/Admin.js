// import React from 'react';

// const Admin = () => {
//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <p>Welcome to the Admin Page. Here you can manage users and monitor the system.</p>
//     </div>
//   );
// };

// export default Admin;



// import React from 'react';

// const Admin = () => {
//   const handleAccountRequestsClick = () => {
//     // Logic to handle account requests will go here
//     console.log("Account Requests button clicked");
//   };

//   const handleLoanRequestsClick = () => {
//     // Logic to handle loan requests will go here
//     console.log("Loan Requests button clicked");
//   };

//   const handleUpdateRequestsClick = () => {
//     // Logic to handle update requests will go here
//     console.log("Update Requests button clicked");
//   };

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <p>Welcome to the Admin Page. Here you can manage users and monitor the system.</p>
//       <button onClick={handleAccountRequestsClick}>Account Requests</button>
//       <button onClick={handleLoanRequestsClick}>Loan Requests</button>
//       <button onClick={handleUpdateRequestsClick}>Update Requests</button>
//     </div>
//   );
// };

// export default Admin;



// import React, { useState } from 'react';
// import axios from 'axios';

// const Admin = () => {
//   const [accountRequests, setAccountRequests] = useState([]);

//   const handleAccountRequestsClick = async () => {
//     try {
//       const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL); // Use the Firestore API URL from .env
//       const requests = response.data.documents || [];
//       setAccountRequests(requests);
//     } catch (error) {
//       console.error("Error fetching account requests", error);
//     }
//   };

//   const handleLoanRequestsClick = () => {
//     console.log("Loan Requests button clicked");
//   };

//   const handleUpdateRequestsClick = () => {
//     console.log("Update Requests button clicked");
//   };

//   const handleApproveRequest = (customerID) => {
//     console.log(`Approve Request for Customer ID: ${customerID}`);
//     // Logic to approve request goes here
//   };

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <p>Welcome to the Admin Page. Here you can manage users and monitor the system.</p>
//       <button onClick={handleAccountRequestsClick}>Account Requests</button>
//       <button onClick={handleLoanRequestsClick}>Loan Requests</button>
//       <button onClick={handleUpdateRequestsClick}>Update Requests</button>

//       {accountRequests.length > 0 && (
//         <table>
//           <thead>
//             <tr>
//               <th>Serial No.</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>DOB</th>
//               <th>Gender</th>
//               <th>Nationality</th>
//               <th>Address</th>
//               <th>Balance</th>
//               <th>Approval</th>
//             </tr>
//           </thead>
//           <tbody>
//             {accountRequests.map((request, index) => {
//               const fields = request.fields || {}; // Handle case where fields might be undefined
//               return (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{fields.Name?.stringValue || "N/A"}</td>
//                   <td>{fields.Email?.stringValue || "N/A"}</td>
//                   <td>{fields.DOB?.stringValue || "N/A"}</td>
//                   <td>{fields.Gender?.stringValue || "N/A"}</td>
//                   <td>{fields.Nationality?.stringValue || "N/A"}</td>
//                   <td>{fields.Address?.stringValue || "N/A"}</td>
//                   <td>{fields.Balance?.integerValue || "0"}</td>
//                   <td>
//                     <button onClick={() => handleApproveRequest(fields.CustomerID?.integerValue)}>
//                       Approve Request
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Admin;



// import React, { useState } from 'react';
// import axios from 'axios';
// import './Admin.css'; // Importing CSS for styling

// const Admin = () => {
//   const [accountRequests, setAccountRequests] = useState([]);

//   const handleAccountRequestsClick = async () => {
//     try {
//       const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL); // Use the Firestore API URL from .env
//       const requests = response.data.documents || [];
//       setAccountRequests(requests);
//     } catch (error) {
//       console.error("Error fetching account requests", error);
//     }
//   };

//   const handleLoanRequestsClick = () => {
//     console.log("Loan Requests button clicked");
//   };

//   const handleUpdateRequestsClick = () => {
//     console.log("Update Requests button clicked");
//   };

//   const handleApproveRequest = (customerID) => {
//     console.log(`Approve Request for Customer ID: ${customerID}`);
//     // Logic to approve request goes here
//   };

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <p>Welcome to the Admin Page. Here you can manage users and monitor the system.</p>
//       <button onClick={handleAccountRequestsClick}>Account Requests</button>
//       <button onClick={handleLoanRequestsClick}>Loan Requests</button>
//       <button onClick={handleUpdateRequestsClick}>Update Requests</button>

//       {accountRequests.length > 0 && (
//         <table className="account-requests-table">
//           <thead>
//             <tr>
//               <th>Serial No.</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>DOB</th>
//               <th>Gender</th>
//               <th>Nationality</th>
//               <th>Address</th>
//               <th>Balance</th>
//               <th>Approval</th>
//             </tr>
//           </thead>
//           <tbody>
//             {accountRequests.map((request, index) => {
//               const fields = request.fields || {}; // Handle case where fields might be undefined
//               const accounts = fields.Accounts?.arrayValue?.values || []; // Get the Accounts array
//               const balance = accounts.length > 0 ? accounts[0].mapValue.fields.Balance?.integerValue : "0"; // Get the balance of the first account
//               return (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{fields.Name?.stringValue || "N/A"}</td>
//                   <td>{fields.Email?.stringValue || "N/A"}</td>
//                   <td>{fields.DOB?.stringValue || "N/A"}</td>
//                   <td>{fields.Gender?.stringValue || "N/A"}</td>
//                   <td>{fields.Nationality?.stringValue || "N/A"}</td>
//                   <td>{fields.Address?.stringValue || "N/A"}</td>
//                   <td>{balance}</td>
//                   <td>
//                     <button onClick={() => handleApproveRequest(fields.CustomerID?.integerValue)}>
//                       Approve Request
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Admin;



// import React, { useState } from 'react';
// import axios from 'axios';
// import './Admin.css'; // Importing CSS for styling

// const Admin = () => {
//   const [accountRequests, setAccountRequests] = useState([]);

//   const handleAccountRequestsClick = async () => {
//     try {
//       const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL); // Use the Firestore API URL from .env
//       const requests = response.data.documents || [];
//       setAccountRequests(requests);
//     } catch (error) {
//       console.error("Error fetching account requests", error);
//     }
//   };

//   const handleLoanRequestsClick = () => {
//     console.log("Loan Requests button clicked");
//   };

//   const handleUpdateRequestsClick = () => {
//     console.log("Update Requests button clicked");
//   };

// const handleApproveRequest = async (customerID, email) => {
//     try {
//       // Fetch the account request document from Accountrequest collection
//       const accountRequestResponse = await axios.get(`${process.env.REACT_APP_FIRESTORE_URL}/${customerID}`);
//       const accountRequestData = accountRequestResponse.data;
  
//       // Prepare the customer data to be stored in Customers collection
//       const customerData = {
//         fields: accountRequestData.fields,
//       };
  
//       // Try to fetch the document from Customers collection using the same customerID
//       const customerResponse = await axios.get(`${process.env.REACT_APP_CUSTOMERS_URL}/${customerID}`).catch(err => {
//         if (err.response && err.response.status === 404) {
//           // Document does not exist in Customers collection, handle 404 error
//           return null;
//         }
//         throw err; // Other errors should be thrown
//       });
  
//       if (!customerResponse) {
//         // No document exists in Customers collection, create a new one with the customerID
//         await axios.patch(`${process.env.REACT_APP_CUSTOMERS_URL}/${customerID}`, customerData);
//       } else {
//         console.log(`Customer document with ID ${customerID} already exists in Customers collection.`);
//       }
  
//       // Delete the document from AccountRequest collection after moving it to Customers
//       await axios.delete(`${process.env.REACT_APP_FIRESTORE_URL}/${customerID}`);
  
//       console.log(`Request approved for Customer ID: ${customerID} with Email: ${email}`);
//       // Optionally, refresh the account requests to reflect changes
//       handleAccountRequestsClick(); // Refresh the list
//     } catch (error) {
//       console.error("Error approving request", error);
//     }
//   };
  
//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <p>Welcome to the Admin Page. Here you can manage users and monitor the system.</p>
//       <button onClick={handleAccountRequestsClick}>Account Requests</button>
//       <button onClick={handleLoanRequestsClick}>Loan Requests</button>
//       <button onClick={handleUpdateRequestsClick}>Update Requests</button>

//       {accountRequests.length > 0 && (
//         <table className="account-requests-table">
//           <thead>
//             <tr>
//               <th>Serial No.</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>DOB</th>
//               <th>Gender</th>
//               <th>Nationality</th>
//               <th>Address</th>
//               <th>Balance</th>
//               <th>Approval</th>
//             </tr>
//           </thead>
//           <tbody>
//             {accountRequests.map((request, index) => {
//               const fields = request.fields || {}; // Handle case where fields might be undefined
//               const accounts = fields.Accounts?.arrayValue?.values || []; // Get the Accounts array
//               const balance = accounts.length > 0 ? accounts[0].mapValue.fields.Balance?.integerValue : "0"; // Get the balance of the first account
//               const email = fields.Email?.stringValue || "N/A"; // Get email

//               return (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{fields.Name?.stringValue || "N/A"}</td>
//                   <td>{email}</td>
//                   <td>{fields.DOB?.stringValue || "N/A"}</td>
//                   <td>{fields.Gender?.stringValue || "N/A"}</td>
//                   <td>{fields.Nationality?.stringValue || "N/A"}</td>
//                   <td>{fields.Address?.stringValue || "N/A"}</td>
//                   <td>{balance}</td>
//                   <td>
//                     <button onClick={() => handleApproveRequest(fields.CustomerID?.integerValue, email)}>
//                       Approve Request
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Admin;


// import React, { useState } from 'react';
// import axios from 'axios';
// import './Admin.css'; // Importing CSS for styling

// const Admin = () => {
//   const [accountRequests, setAccountRequests] = useState([]);

//   const handleAccountRequestsClick = async () => {
//     try {
//       const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL); // Use the Firestore API URL from .env
//       const requests = response.data.documents || [];
//       setAccountRequests(requests);
//     } catch (error) {
//       console.error("Error fetching account requests", error);
//     }
//   };

//   const handleLoanRequestsClick = () => {
//     console.log("Loan Requests button clicked");
//   };

//   const handleUpdateRequestsClick = () => {
//     console.log("Update Requests button clicked");
//   };

//   const handleApproveRequest = async (customerID, email) => {
//     try {
//       // Fetch all account requests to find the matching email
//       const accountRequestResponse = await axios.get(process.env.REACT_APP_FIRESTORE_URL);
//       const accountRequestsData = accountRequestResponse.data.documents || [];

//       const matchedRequest = accountRequestsData.find(request => {
//         const fields = request.fields || {};
//         return fields.Email?.stringValue === email;
//       });

//       if (matchedRequest) {
//         const customerData = {
//           fields: matchedRequest.fields,
//         };

//         // Create a new document in Customers collection if it doesn't exist
//         await axios.put(`${process.env.REACT_APP_CUSTOMERS_URL}/${matchedRequest.fields.CustomerID?.integerValue}`, customerData);

//         // Delete the document from AccountRequest collection after moving it to Customers
//         await axios.delete(`${process.env.REACT_APP_FIRESTORE_URL}/${matchedRequest.name.split('/').pop()}`);

//         console.log(`Request approved for Customer ID: ${matchedRequest.fields.CustomerID?.integerValue} with Email: ${email}`);
//         // Optionally, refresh the account requests to reflect changes
//         handleAccountRequestsClick(); // Refresh the list
//       } else {
//         console.error("No matching account request found for the email:", email);
//       }
//     } catch (error) {
//       console.error("Error approving request", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <p>Welcome to the Admin Page. Here you can manage users and monitor the system.</p>
//       <button onClick={handleAccountRequestsClick}>Account Requests</button>
//       <button onClick={handleLoanRequestsClick}>Loan Requests</button>
//       <button onClick={handleUpdateRequestsClick}>Update Requests</button>

//       {accountRequests.length > 0 && (
//         <table className="account-requests-table">
//           <thead>
//             <tr>
//               <th>Serial No.</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>DOB</th>
//               <th>Gender</th>
//               <th>Nationality</th>
//               <th>Address</th>
//               <th>Balance</th>
//               <th>Approval</th>
//             </tr>
//           </thead>
//           <tbody>
//             {accountRequests.map((request, index) => {
//               const fields = request.fields || {}; // Handle case where fields might be undefined
//               const accounts = fields.Accounts?.arrayValue?.values || []; // Get the Accounts array
//               const balance = accounts.length > 0 ? accounts[0].mapValue.fields.Balance?.integerValue : "0"; // Get the balance of the first account
//               const email = fields.Email?.stringValue || "N/A"; // Get email

//               return (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{fields.Name?.stringValue || "N/A"}</td>
//                   <td>{email}</td>
//                   <td>{fields.DOB?.stringValue || "N/A"}</td>
//                   <td>{fields.Gender?.stringValue || "N/A"}</td>
//                   <td>{fields.Nationality?.stringValue || "N/A"}</td>
//                   <td>{fields.Address?.stringValue || "N/A"}</td>
//                   <td>{balance}</td>
//                   <td>
//                     <button onClick={() => handleApproveRequest(fields.CustomerID?.integerValue, email)}>
//                       Approve Request
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Admin;




// import React, { useState } from 'react';
// import axios from 'axios';
// import './Admin.css'; // Importing CSS for styling

// const Admin = () => {
//   const [accountRequests, setAccountRequests] = useState([]);

//   const handleAccountRequestsClick = async () => {
//     try {
//       const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL); // Use the Firestore API URL from .env
//       const requests = response.data.documents || [];
//       setAccountRequests(requests);
//     } catch (error) {
//       console.error("Error fetching account requests", error);
//     }
//   };

//   const handleLoanRequestsClick = () => {
//     console.log("Loan Requests button clicked");
//   };

//   const handleUpdateRequestsClick = () => {
//     console.log("Update Requests button clicked");
//   };

//   const handleApproveRequest = async (email) => {
//     try {
//       // Fetch all account requests to find the matching email
//       const accountRequestResponse = await axios.get(process.env.REACT_APP_FIRESTORE_URL);
//       const accountRequestsData = accountRequestResponse.data.documents || [];

//       // Find the request that matches the clicked email
//       const matchedRequest = accountRequestsData.find(request => {
//         const fields = request.fields || {};
//         return fields.Email?.stringValue === email;
//       });

//       if (matchedRequest) {
//         const customerID = matchedRequest.fields.CustomerID?.integerValue || matchedRequest.fields.CustomerID?.integerValue;

//         if (!customerID) {
//           console.error("CustomerID is undefined for the request with email:", email);
//           return;
//         }

//         const customerData = {
//           fields: matchedRequest.fields,
//         };

//         // Create a new document in Customers collection if it doesn't exist
//         await axios.patch(`${process.env.REACT_APP_CUSTOMERS_URL}/${customerID}`, customerData);

//         // Delete the document from AccountRequest collection after moving it to Customers
//         await axios.delete(`${process.env.REACT_APP_FIRESTORE_URL}/${matchedRequest.name.split('/').pop()}`);

//         console.log(`Request approved for Customer ID: ${customerID} with Email: ${email}`);
//         // Optionally, refresh the account requests to reflect changes
//         handleAccountRequestsClick(); // Refresh the list
//       } else {
//         console.error("No matching account request found for the email:", email);
//       }
//     } catch (error) {
//       console.error("Error approving request", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <p>Welcome to the Admin Page. Here you can manage users and monitor the system.</p>
//       <button onClick={handleAccountRequestsClick}>Account Requests</button>
//       <button onClick={handleLoanRequestsClick}>Loan Requests</button>
//       <button onClick={handleUpdateRequestsClick}>Update Requests</button>

//       {accountRequests.length > 0 && (
//         <table className="account-requests-table">
//           <thead>
//             <tr>
//               <th>Serial No.</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>DOB</th>
//               <th>Gender</th>
//               <th>Nationality</th>
//               <th>Address</th>
//               <th>Balance</th>
//               <th>Approval</th>
//             </tr>
//           </thead>
//           <tbody>
//             {accountRequests.map((request, index) => {
//               const fields = request.fields || {}; // Handle case where fields might be undefined
//               const accounts = fields.Accounts?.arrayValue?.values || []; // Get the Accounts array
//               const balance = accounts.length > 0 ? accounts[0].mapValue.fields.Balance?.integerValue : "0"; // Get the balance of the first account
//               const email = fields.Email?.stringValue || "N/A"; // Get email

//               return (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{fields.Name?.stringValue || "N/A"}</td>
//                   <td>{email}</td>
//                   <td>{fields.DOB?.stringValue || "N/A"}</td>
//                   <td>{fields.Gender?.stringValue || "N/A"}</td>
//                   <td>{fields.Nationality?.stringValue || "N/A"}</td>
//                   <td>{fields.Address?.stringValue || "N/A"}</td>
//                   <td>{balance}</td>
//                   <td>
//                     <button onClick={() => handleApproveRequest(email)}>
//                       Approve Request
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Admin;



// import React, { useState } from 'react';
// import axios from 'axios';
// import './Admin.css'; // Importing CSS for styling

// const Admin = () => {
//   const [accountRequests, setAccountRequests] = useState([]);

//   const handleAccountRequestsClick = async () => {
//     try {
//       const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL); // Use the Firestore API URL from .env
//       const requests = response.data.documents || [];
//       setAccountRequests(requests);
//     } catch (error) {
//       console.error("Error fetching account requests", error);
//     }
//   };

//   const handleLoanRequestsClick = () => {
//     console.log("Loan Requests button clicked");
//   };

//   const handleUpdateRequestsClick = () => {
//     console.log("Update Requests button clicked");
//   };
  
// const handleApproveRequest = async (email, customerID) => {
//     try {
//         // Fetch the documents from Accountrequest
//         const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL);
//         const requests = response.data.documents || [];
//         const requestToApprove = requests.find(request => request.fields.Email?.stringValue === email);

//         if (requestToApprove) {
//             // Get the CustomerID and other fields
//             const customerData = {
//                 fields: {
//                     CustomerID: { stringValue: customerID },
//                     Name: requestToApprove.fields.Name,
//                     DOB: requestToApprove.fields.DOB,
//                     Gender: requestToApprove.fields.Gender,
//                     Nationality: requestToApprove.fields.Nationality,
//                     Address: requestToApprove.fields.Address,
//                     Email: requestToApprove.fields.Email,
//                     Password: requestToApprove.fields.Password,
//                     Accounts: requestToApprove.fields.Accounts,
//                     PanCard: requestToApprove.fields.PanCard,
//                     AadharCard: requestToApprove.fields.AadharCard,
//                 },
//             };

//             // Construct URL for the Customers collection
//             const customerUrl = `${process.env.REACT_APP_CUSTOMERS_URL}/${customerID}`;
//             console.log(`Moving customer data to: ${customerUrl}`); // Debugging log
//             await axios.patch(customerUrl, customerData);

//             // Construct the document ID for deletion
//             const documentId = requestToApprove.name.split('/').pop(); // Extract document ID
//             const accountRequestUrl = `${process.env.REACT_APP_FIRESTORE_URL}/${documentId}`;
//             console.log(`Deleting account request from: ${accountRequestUrl}`); // Debugging log
//             await axios.delete(accountRequestUrl);

//             // Update the account requests state
//             setAccountRequests(prevRequests => prevRequests.filter(request => request.fields.Email?.stringValue !== email));
//             console.log(`Approved request for Customer ID: ${customerID}`);
//         } else {
//             console.error("No request found for the given email");
//         }
//     } catch (error) {
//         console.error("Error approving request", error);
//     }
// };

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <p>Welcome to the Admin Page. Here you can manage users and monitor the system.</p>
//       <button onClick={handleAccountRequestsClick}>Account Requests</button>
//       <button onClick={handleLoanRequestsClick}>Loan Requests</button>
//       <button onClick={handleUpdateRequestsClick}>Update Requests</button>

//       {accountRequests.length > 0 && (
//         <table className="account-requests-table">
//           <thead>
//             <tr>
//               <th>Serial No.</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>DOB</th>
//               <th>Gender</th>
//               <th>Nationality</th>
//               <th>Address</th>
//               <th>Balance</th>
//               <th>Approval</th>
//             </tr>
//           </thead>
//           <tbody>
//             {accountRequests.map((request, index) => {
//               const fields = request.fields || {}; // Handle case where fields might be undefined
//               const accounts = fields.Accounts?.arrayValue?.values || []; // Get the Accounts array
//               const balance = accounts.length > 0 ? accounts[0].mapValue.fields.Balance?.integerValue : "0"; // Get the balance of the first account
//               const email = fields.Email?.stringValue || "N/A"; // Email field
//               const customerID = fields.CustomerID?.integerValue; // CustomerID field

//               return (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{fields.Name?.stringValue || "N/A"}</td>
//                   <td>{email}</td>
//                   <td>{fields.DOB?.stringValue || "N/A"}</td>
//                   <td>{fields.Gender?.stringValue || "N/A"}</td>
//                   <td>{fields.Nationality?.stringValue || "N/A"}</td>
//                   <td>{fields.Address?.stringValue || "N/A"}</td>
//                   <td>{balance}</td>
//                   <td>
//                     <button onClick={() => handleApproveRequest(email, customerID)}>
//                       Approve Request
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Admin;






// import React, { useState } from 'react';
// import axios from 'axios';
// import './Admin.css'; // Importing CSS for styling

// const Admin = () => {
//   const [accountRequests, setAccountRequests] = useState([]);

//   const handleAccountRequestsClick = async () => {
//     try {
//       const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL); // Use the Firestore API URL from .env
//       const requests = response.data.documents || [];
//       setAccountRequests(requests);
//     } catch (error) {
//       console.error("Error fetching account requests", error);
//     }
//   };

//   const handleLoanRequestsClick = () => {
//     console.log("Loan Requests button clicked");
//   };

//   const handleUpdateRequestsClick = () => {
//     console.log("Update Requests button clicked");
//   };

//   const handleApproveRequest = async (email) => {
//     try {
//       // Fetch the documents from Accountrequest
//       const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL);
//       const requests = response.data.documents || [];
//       const requestToApprove = requests.find(request => request.fields.Email?.stringValue === email);

//       if (requestToApprove) {
//         // Get the CustomerID and other fields
//         const customerID = requestToApprove.fields.CustomerID?.integerValue;
//         const accounts = requestToApprove.fields.Accounts;

//         // Prepare the customer data
//         const customerData = {
//           fields: {
//             CustomerID: { integerValue: customerID },
//             Name: requestToApprove.fields.Name,
//             DOB: requestToApprove.fields.DOB,
//             Gender: requestToApprove.fields.Gender,
//             Nationality: requestToApprove.fields.Nationality,
//             Address: requestToApprove.fields.Address,
//             Email: requestToApprove.fields.Email,
//             Password: requestToApprove.fields.Password,
//             PanCard: requestToApprove.fields.PanCard,
//             AadharCard: requestToApprove.fields.AadharCard,
//             Accounts: accounts, // Include the entire accounts object
//           },
//         };

//         // Construct URL for the Customers collection
//         const customerUrl = `${process.env.REACT_APP_CUSTOMERS_URL}/${customerID}`;
//         console.log(`Moving customer data to: ${customerUrl}`); // Debugging log
//         await axios.patch(customerUrl, customerData);

//         // Construct the document ID for deletion
//         const documentId = requestToApprove.name.split('/').pop(); // Extract document ID
//         const accountRequestUrl = `${process.env.REACT_APP_FIRESTORE_URL}/${documentId}`;
//         console.log(`Deleting account request from: ${accountRequestUrl}`); // Debugging log
//         await axios.delete(accountRequestUrl);

//         // Update the account requests state
//         setAccountRequests(prevRequests => prevRequests.filter(request => request.fields.Email?.stringValue !== email));
//         console.log(`Approved request for Customer ID: ${customerID}`);
//       } else {
//         console.error("No request found for the given email");
//       }
//     } catch (error) {
//       console.error("Error approving request", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <p>Welcome to the Admin Page. Here you can manage users and monitor the system.</p>
//       <button onClick={handleAccountRequestsClick}>Account Requests</button>
//       <button onClick={handleLoanRequestsClick}>Loan Requests</button>
//       <button onClick={handleUpdateRequestsClick}>Update Requests</button>

//       {accountRequests.length > 0 && (
//         <table className="account-requests-table">
//           <thead>
//             <tr>
//               <th>Serial No.</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>DOB</th>
//               <th>Gender</th>
//               <th>Nationality</th>
//               <th>Address</th>
//               <th>Balance</th>
//               <th>Approval</th>
//             </tr>
//           </thead>
//           <tbody>
//             {accountRequests.map((request, index) => {
//               const fields = request.fields || {}; // Handle case where fields might be undefined
//               const accounts = fields.Accounts?.arrayValue?.values || []; // Get the Accounts array
//               const balance = accounts.length > 0 ? accounts[0].mapValue.fields.Balance?.integerValue : "0"; // Get the balance of the first account
//               const email = fields.Email?.stringValue || "N/A"; // Email field

//               return (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{fields.Name?.stringValue || "N/A"}</td>
//                   <td>{email}</td>
//                   <td>{fields.DOB?.stringValue || "N/A"}</td>
//                   <td>{fields.Gender?.stringValue || "N/A"}</td>
//                   <td>{fields.Nationality?.stringValue || "N/A"}</td>
//                   <td>{fields.Address?.stringValue || "N/A"}</td>
//                   <td>{balance}</td>
//                   <td>
//                     <button onClick={() => handleApproveRequest(email)}>
//                       Approve Request
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Admin;



// import React, { useState } from 'react';
// import axios from 'axios';
// import './Admin.css'; // Importing CSS for styling

// const Admin = () => {
//   const [accountRequests, setAccountRequests] = useState([]);

//   const handleAccountRequestsClick = async () => {
//     try {
//       const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL); // Use the Firestore API URL from .env
//       const requests = response.data.documents || [];
//       setAccountRequests(requests);
//     } catch (error) {
//       console.error("Error fetching account requests", error);
//     }
//   };

//   const handleLoanRequestsClick = () => {
//     console.log("Loan Requests button clicked");
//   };

//   const handleUpdateRequestsClick = () => {
//     console.log("Update Requests button clicked");
//   };

//   const handleApproveRequest = async (email) => {
//     try {
//       // Fetch the documents from Accountrequest
//       const accountRequestResponse = await axios.get(process.env.REACT_APP_FIRESTORE_URL);
//       const requests = accountRequestResponse.data.documents || [];
//       const requestToApprove = requests.find(request => request.fields.Email?.stringValue === email);

//       if (requestToApprove) {
//         // Get the fields from the request to be approved
//         const customerDataFromRequest = requestToApprove.fields;

//         // Fetch all customers from the Customers collection
//         const customersResponse = await axios.get(process.env.REACT_APP_CUSTOMERS_URL);
//         const customers = customersResponse.data.documents || [];

//         // Find the highest existing CustomerID
//         let highestCustomerID = 0;
//         customers.forEach((customer) => {
//           const customerID = customer.fields.CustomerID?.integerValue;
//           if (customerID && customerID > highestCustomerID) {
//             highestCustomerID = customerID;
//           }
//         });

//         // Increment the CustomerID by 1
//         const newCustomerID = highestCustomerID + 1;


//         // Prepare the new customer data with the incremented CustomerID
//         const newCustomerData = {
//           fields: {
//             CustomerID: { integerValue: newCustomerID },
//             Name: customerDataFromRequest.Name,
//             DOB: customerDataFromRequest.DOB,
//             Gender: customerDataFromRequest.Gender,
//             Nationality: customerDataFromRequest.Nationality,
//             Address: customerDataFromRequest.Address,
//             Email: customerDataFromRequest.Email,
//             Password: customerDataFromRequest.Password,
//             PanCard: customerDataFromRequest.PanCard,
//             AadharCard: customerDataFromRequest.AadharCard,
//             Accounts: customerDataFromRequest.Accounts, // Include the entire accounts object
//           },
//         };

//         // Store the new customer data in a new document with incremented CustomerID
//         const newCustomerUrl = `${process.env.REACT_APP_CUSTOMERS_URL}/${newCustomerID}`;
//         console.log(`Creating a new customer document with ID: ${newCustomerID}`); // Debugging log
//         await axios.patch(newCustomerUrl, newCustomerData);

//         // Construct the document ID for deletion from Accountrequest
//         const documentId = requestToApprove.name.split('/').pop(); // Extract document ID
//         const accountRequestUrl = `${process.env.REACT_APP_FIRESTORE_URL}/${documentId}`;
//         console.log(`Deleting account request from: ${accountRequestUrl}`); // Debugging log
//         await axios.delete(accountRequestUrl);

//         // Update the account requests state after approval and deletion
//         setAccountRequests(prevRequests => prevRequests.filter(request => request.fields.Email?.stringValue !== email));
//         console.log(`Approved request for Customer with new Customer ID: ${newCustomerID}`);
//       } else {
//         console.error("No request found for the given email");
//       }
//     } catch (error) {
//       console.error("Error approving request", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <p>Welcome to the Admin Page. Here you can manage users and monitor the system.</p>
//       <button onClick={handleAccountRequestsClick}>Account Requests</button>
//       <button onClick={handleLoanRequestsClick}>Loan Requests</button>
//       <button onClick={handleUpdateRequestsClick}>Update Requests</button>

//       {accountRequests.length > 0 && (
//         <table className="account-requests-table">
//           <thead>
//             <tr>
//               <th>Serial No.</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>DOB</th>
//               <th>Gender</th>
//               <th>Nationality</th>
//               <th>Address</th>
//               <th>Balance</th>
//               <th>Approval</th>
//             </tr>
//           </thead>
//           <tbody>
//             {accountRequests.map((request, index) => {
//               const fields = request.fields || {}; // Handle case where fields might be undefined
//               const accounts = fields.Accounts?.arrayValue?.values || []; // Get the Accounts array
//               const balance = accounts.length > 0 ? accounts[0].mapValue.fields.Balance?.integerValue : "0"; // Get the balance of the first account
//               const email = fields.Email?.stringValue || "N/A"; // Email field

//               return (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{fields.Name?.stringValue || "N/A"}</td>
//                   <td>{email}</td>
//                   <td>{fields.DOB?.stringValue || "N/A"}</td>
//                   <td>{fields.Gender?.stringValue || "N/A"}</td>
//                   <td>{fields.Nationality?.stringValue || "N/A"}</td>
//                   <td>{fields.Address?.stringValue || "N/A"}</td>
//                   <td>{balance}</td>
//                   <td>
//                     <button onClick={() => handleApproveRequest(email)}>
//                       Approve Request
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Admin;



import React, { useState } from 'react';
import axios from 'axios';
import './Admin.css'; // Importing CSS for styling

const Admin = () => {
  const [accountRequests, setAccountRequests] = useState([]);

  const handleAccountRequestsClick = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_FIRESTORE_URL); // Use the Firestore API URL from .env
      const requests = response.data.documents || [];
      setAccountRequests(requests);
    } catch (error) {
      console.error("Error fetching account requests", error);
    }
  };

  const handleLoanRequestsClick = () => {
    console.log("Loan Requests button clicked");
  };

  const handleUpdateRequestsClick = () => {
    console.log("Update Requests button clicked");
  };

  const handleApproveRequest = async (email) => {
    try {
      // Fetch the documents from Accountrequest
      const accountRequestResponse = await axios.get(process.env.REACT_APP_FIRESTORE_URL);
      const requests = accountRequestResponse.data.documents || [];
      const requestToApprove = requests.find(request => request.fields.Email?.stringValue === email);

      if (requestToApprove) {
        // Get the fields from the request to be approved
        const customerDataFromRequest = requestToApprove.fields;

        // Fetch all customers from the Customers collection
        const customersResponse = await axios.get(process.env.REACT_APP_CUSTOMERS_URL);
        const customers = customersResponse.data.documents || [];

        // Find the highest existing CustomerID
        let highestCustomerID = 0;
        customers.forEach((customer) => {
          const customerID = parseInt(customer.fields.CustomerID?.integerValue, 10); // Parse as integer
          if (customerID && customerID > highestCustomerID) {
            highestCustomerID = customerID;
          }
        });

        // Increment the CustomerID by 1
        const newCustomerID = highestCustomerID + 1;  // Correct integer addition

        // Prepare the new customer data with the incremented CustomerID
        const newCustomerData = {
          fields: {
            CustomerID: { integerValue: newCustomerID },
            Name: customerDataFromRequest.Name,
            DOB: customerDataFromRequest.DOB,
            Gender: customerDataFromRequest.Gender,
            Nationality: customerDataFromRequest.Nationality,
            Address: customerDataFromRequest.Address,
            Email: customerDataFromRequest.Email,
            Password: customerDataFromRequest.Password,
            PanCard: customerDataFromRequest.PanCard,
            AadharCard: customerDataFromRequest.AadharCard,
            Accounts: customerDataFromRequest.Accounts, // Include the entire accounts object
          },
        };

        // Store the new customer data in a new document with incremented CustomerID
        const newCustomerUrl = `${process.env.REACT_APP_CUSTOMERS_URL}/${newCustomerID}`;
        console.log(`Creating a new customer document with ID: ${newCustomerID}`); // Debugging log
        await axios.patch(newCustomerUrl, newCustomerData);

        // Construct the document ID for deletion from Accountrequest
        const documentId = requestToApprove.name.split('/').pop(); // Extract document ID
        const accountRequestUrl = `${process.env.REACT_APP_FIRESTORE_URL}/${documentId}`;
        console.log(`Deleting account request from: ${accountRequestUrl}`); // Debugging log
        await axios.delete(accountRequestUrl);

        // Update the account requests state after approval and deletion
        setAccountRequests(prevRequests => prevRequests.filter(request => request.fields.Email?.stringValue !== email));
        console.log(`Approved request for Customer with new Customer ID: ${newCustomerID}`);
      } else {
        console.error("No request found for the given email");
      }
    } catch (error) {
      console.error("Error approving request", error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the Admin Page. Here you can manage users and monitor the system.</p>
      <button onClick={handleAccountRequestsClick}>Account Requests</button>
      <button onClick={handleLoanRequestsClick}>Loan Requests</button>
      <button onClick={handleUpdateRequestsClick}>Update Requests</button>

      {accountRequests.length > 0 && (
        <table className="account-requests-table">
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Nationality</th>
              <th>Address</th>
              <th>Balance</th>
              <th>Approval</th>
            </tr>
          </thead>
          <tbody>
            {accountRequests.map((request, index) => {
              const fields = request.fields || {}; // Handle case where fields might be undefined
              const accounts = fields.Accounts?.arrayValue?.values || []; // Get the Accounts array
              const balance = accounts.length > 0 ? accounts[0].mapValue.fields.Balance?.integerValue : "0"; // Get the balance of the first account
              const email = fields.Email?.stringValue || "N/A"; // Email field

              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{fields.Name?.stringValue || "N/A"}</td>
                  <td>{email}</td>
                  <td>{fields.DOB?.stringValue || "N/A"}</td>
                  <td>{fields.Gender?.stringValue || "N/A"}</td>
                  <td>{fields.Nationality?.stringValue || "N/A"}</td>
                  <td>{fields.Address?.stringValue || "N/A"}</td>
                  <td>{balance}</td>
                  <td>
                    <button onClick={() => handleApproveRequest(email)}>
                      Approve Request
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Admin;
