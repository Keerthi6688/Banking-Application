// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faIdCard, faBank, faMapMarkerAlt, faCode } from '@fortawesome/free-solid-svg-icons';
// import './ProfilePage.css';

// const ProfilePage = () => {
//   const navigate = useNavigate();
//   const [customerData, setCustomerData] = useState(null);
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

//   return (
//     <div className="profile-page">
//       <h1>Account Details</h1>
//       {error && <p className="error-message">{error}</p>}
//       {customerData && (
//         <div className="profile-container">
//           <h4>
//             <FontAwesomeIcon icon={faIdCard} /> Customer ID: {customerData.CustomerID.integerValue}
//           </h4>
//           <h4>
//             <FontAwesomeIcon icon={faUser} /> Account Holder's Name: {customerData.Name.stringValue}
//           </h4>
//           <h4>
//             <FontAwesomeIcon icon={faBank} /> Account Number: {customerData.Accounts.arrayValue.values[0].mapValue.fields.AccountNumber.stringValue}
//           </h4>
//           <h4>
//             <FontAwesomeIcon icon={faCode} /> IFSC Code: {customerData.Accounts.arrayValue.values[0].mapValue.fields.IFSC.stringValue}
//           </h4>
//           <h4>
//             <FontAwesomeIcon icon={faMapMarkerAlt} /> Address: {customerData.Address.stringValue}
//           </h4>
//           <h4>
//             <FontAwesomeIcon icon={faBank} /> Account Type: {customerData.Accounts.arrayValue.values[0].mapValue.fields.AccountType.stringValue}
//           </h4>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faIdCard, faBank, faMapMarkerAlt, faCode } from '@fortawesome/free-solid-svg-icons';
// import './ProfilePage.css';

// const ProfilePage = () => {
//   const navigate = useNavigate();
//   const [customerData, setCustomerData] = useState(null);
//   const [error, setError] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedData, setUpdatedData] = useState({});
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
//           setUpdatedData({
//             Name: customer.fields.Name.stringValue,
//             Email: customer.fields.Email.stringValue,
//             Address: customer.fields.Address.stringValue,
//             Phone: customer.fields.Phone.stringValue,
//             DOB: customer.fields.DOB.stringValue
//           });
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

//   const handleUpdateClick = () => {
//     setIsEditing(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const customerID = customerData.CustomerID.integerValue;
//       await axios.patch(`${process.env.REACT_APP_CUSTOMERS_URL}/${customerID}`, {
//         fields: {
//           Name: { stringValue: updatedData.Name },
//           Email: { stringValue: updatedData.Email },
//           Address: { stringValue: updatedData.Address },
//           Phone: { stringValue: updatedData.Phone },
//           DOB: { stringValue: updatedData.DOB }
//         }
//       });
//       setIsEditing(false);
//       setCustomerData((prevData) => ({
//         ...prevData,
//         ...updatedData
//       }));
//       console.log("Profile updated successfully.");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       setError("Failed to update profile. Please try again.");
//     }
//   };

//   return (
//     <div className="profile-page">
//       <h1>Account Details</h1>
//       {error && <p className="error-message">{error}</p>}
//       {customerData && !isEditing && (
//         <div className="profile-container">
//           <h4>
//             <FontAwesomeIcon icon={faIdCard} /> Customer ID: {customerData.CustomerID.integerValue}
//           </h4>
//           <h4>
//             <FontAwesomeIcon icon={faUser} /> Account Holder's Name: {customerData.Name.stringValue}
//           </h4>
//           <h4>
//             <FontAwesomeIcon icon={faBank} /> Account Number: {customerData.Accounts.arrayValue.values[0].mapValue.fields.AccountNumber.stringValue}
//           </h4>
//           <h4>
//             <FontAwesomeIcon icon={faCode} /> IFSC Code: {customerData.Accounts.arrayValue.values[0].mapValue.fields.IFSC.stringValue}
//           </h4>
//           <h4>
//             <FontAwesomeIcon icon={faMapMarkerAlt} /> Address: {customerData.Address.stringValue}
//           </h4>
//           <h4>
//             <FontAwesomeIcon icon={faBank} /> Account Type: {customerData.Accounts.arrayValue.values[0].mapValue.fields.AccountType.stringValue}
//           </h4>
//           <button onClick={handleUpdateClick} className="update-button">Update Profile</button>
//         </div>
//       )}

//       {isEditing && (
//         <form className="update-form" onSubmit={handleFormSubmit}>
//           <h2>Update Profile</h2>
//           <label>
//             Name:
//             <input
//               type="text"
//               name="Name"
//               value={updatedData.Name}
//               onChange={handleInputChange}
//             />
//           </label>
//           <label>
//             Email:
//             <input
//               type="email"
//               name="Email"
//               value={updatedData.Email}
//               onChange={handleInputChange}
//             />
//           </label>
//           <label>
//             Address:
//             <input
//               type="text"
//               name="Address"
//               value={updatedData.Address}
//               onChange={handleInputChange}
//             />
//           </label>
//           <label>
//             Phone:
//             <input
//               type="text"
//               name="Phone"
//               value={updatedData.Phone}
//               onChange={handleInputChange}
//             />
//           </label>
//           <label>
//             Date of Birth:
//             <input
//               type="date"
//               name="DOB"
//               value={updatedData.DOB}
//               onChange={handleInputChange}
//             />
//           </label>
//           <button type="submit" className="save-button">Save Changes</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;


//final

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faIdCard, faBank, faMapMarkerAlt, faCode } from '@fortawesome/free-solid-svg-icons';
import './ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState(null);
  const [error, setError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    AadharCard: "",
    Address: "",
    DOB: "",
    Name: "",
    Email: "",
    Gender: "",
    Nationality: "",
    PanCard: ""
  });

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

          // Initialize form data with the retrieved customer fields (excluding Accounts and CustomerID)
          setFormData({
            // AadharCard: customer.fields.AadharCard.stringValue,
            Address: customer.fields.Address.stringValue,
            DOB: customer.fields.DOB.stringValue,
            Name: customer.fields.Name.stringValue,
            Email: customer.fields.Email.stringValue,
            Gender: customer.fields.Gender.stringValue,
            Nationality: customer.fields.Nationality.stringValue,
            // PanCard: customer.fields.PanCard.stringValue,
          });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update the customer document with new data
      await axios.patch(`${process.env.REACT_APP_CUSTOMERS_URL}/${customerData.CustomerID.integerValue}`, {
        fields: {
          // AadharCard: { stringValue: formData.AadharCard },
          Address: { stringValue: formData.Address },
          DOB: { stringValue: formData.DOB },
          Name: { stringValue: formData.Name },
          Email: { stringValue: formData.Email },
          Gender: { stringValue: formData.Gender },
          Nationality: { stringValue: formData.Nationality },
          // PanCard: { stringValue: formData.PanCard },
        }
      });

      // Refresh customer data after updating
      setCustomerData((prev) => ({
        ...prev,
        // AadharCard: { stringValue: formData.AadharCard },
        Address: { stringValue: formData.Address },
        DOB: { stringValue: formData.DOB },
        Name: { stringValue: formData.Name },
        Email: { stringValue: formData.Email },
        Gender: { stringValue: formData.Gender },
        Nationality: { stringValue: formData.Nationality },
        // PanCard: { stringValue: formData.PanCard },
      }));

      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating customer data", error);
    }
  };

  return (
    <div className="profile-page">
      <h1>Account Details</h1>
      {error && <p className="error-message">{error}</p>}
      {customerData && (
        <div className="profile-container">
          {!isEditMode ? (
            <>
              <h4>
                <FontAwesomeIcon icon={faIdCard} /> Customer ID: {customerData.CustomerID.integerValue}
              </h4>
              <h4>
                <FontAwesomeIcon icon={faUser} /> Account Holder's Name: {customerData.Name.stringValue}
              </h4>
              <h4>
                <FontAwesomeIcon icon={faBank} /> Account Number: {customerData.Accounts.arrayValue.values[0].mapValue.fields.AccountNumber.stringValue}
              </h4>
              <h4>
                <FontAwesomeIcon icon={faCode} /> IFSC Code: {customerData.Accounts.arrayValue.values[0].mapValue.fields.IFSC.stringValue}
              </h4>
              <h4>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> Address: {customerData.Address.stringValue}
              </h4>
              <h4>
                <FontAwesomeIcon icon={faBank} /> Account Type: {customerData.Accounts.arrayValue.values[0].mapValue.fields.AccountType.stringValue}
              </h4>

              <button onClick={() => setIsEditMode(true)} className="update-profile-btn">
                Update Profile
              </button>
            </>
          ) : (
            <form onSubmit={handleFormSubmit} className="update-form">
              <div>
                <label>Aadhar Card:</label>
                <input
                  type="text"
                  name="AadharCard"
                  value={formData.AadharCard}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Address:</label>
                <input
                  type="text"
                  name="Address"
                  value={formData.Address}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Date of Birth:</label>
                <input
                  type="date"
                  name="DOB"
                  value={formData.DOB}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="Name"
                  value={formData.Name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Gender:</label>
                <input
                  type="text"
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Nationality:</label>
                <input
                  type="text"
                  name="Nationality"
                  value={formData.Nationality}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>PAN Card:</label>
                <input
                  type="text"
                  name="PanCard"
                  value={formData.PanCard}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="save-profile-btn">
                Save Profile
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
