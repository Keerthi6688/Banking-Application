// import axios from 'axios';

// const LoadTransactions = async () => {
//   try {
//     // Step 1: Fetch the document from common_db using the API link
//     const commonDbUrl = process.env.REACT_APP_COMMON_DB_URL; // Store this in your .env file
//     const documentId = 'Keerthi6688'; // Use the appropriate document ID as needed

//     const commonDbResponse = await axios.get(`${commonDbUrl}/${documentId}`);
//     const commonDbData = commonDbResponse.data;

//     // Check if the document has fields and process each array
//     for (const [arrayName, arrayDetails] of Object.entries(commonDbData.fields)) {
//       if (arrayDetails.arrayValue) {
//         const arrayValues = arrayDetails.arrayValue.values;

//         // Step 2: Fetch customers to match AccountNumber
//         const customersResponse = await axios.get(process.env.REACT_APP_CUSTOMERS_URL); // Store this in your .env file
//         const customers = customersResponse.data.documents;

//         for (const customer of customers) {
//           const accountNumbers = customer.fields.Accounts.arrayValue.values.map(acc => acc.mapValue.fields.AccountNumber.stringValue);

//           // Step 3: Match and process transactions
//           if (accountNumbers.includes(arrayName)) {
//             const customerID = customer.fields.CustomerID.integerValue;

//             // Step 4: Store the fetched array into the Transactions collection for the matched CustomerID
//             await storeTransactions(customerID, arrayValues);

//             console.log(`Stored transactions for CustomerID: ${customerID}`);
//           }
//         }
//       }
//     }
//   } catch (error) {
//     console.error("Error loading transactions:", error);
//   }
// };

// // Function to store transactions into the customer's Transactions collection
// const storeTransactions = async (customerID, transactionsArray) => {
//   try {
//     const transactionsResponse = await axios.get(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`);
//     const existingTransactions = transactionsResponse.data.fields.Transactions?.arrayValue?.values || [];

//     // Combine existing transactions with new ones
//     const updatedTransactions = [...existingTransactions, ...transactionsArray.map(item => ({ mapValue: { fields: item.mapValue.fields } }))];

//     // Update the Transactions collection for the customer
//     await axios.patch(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`, {
//       fields: {
//         Transactions: {
//           arrayValue: {
//             values: updatedTransactions
//           }
//         }
//       }
//     });
//   } catch (error) {
//     console.error(`Error storing transactions for CustomerID ${customerID}:`, error);
//     throw error;
//   }
// };

// export default LoadTransactions;





// import axios from 'axios';

// const LoadTransactions = async () => {
//   try {
//     // Step 1: Fetch the document from common_db using the API link
//     const commonDbUrl = process.env.REACT_APP_COMMON_DB_URL; // Store this in your .env file
//     const documentId = 'Keerthi6688'; // Use the appropriate document ID as needed

//     const commonDbResponse = await axios.get(`${commonDbUrl}/${documentId}`);
//     const commonDbData = commonDbResponse.data;

//     // Check if the document has fields and process each array
//     for (const [arrayName, arrayDetails] of Object.entries(commonDbData.fields)) {
//       if (arrayDetails.arrayValue) {
//         const arrayValues = arrayDetails.arrayValue.values;

//         // Step 2: Fetch customers to match AccountNumber
//         const customersResponse = await axios.get(process.env.REACT_APP_CUSTOMERS_URL); // Store this in your .env file
//         const customers = customersResponse.data.documents;

//         for (const customer of customers) {
//           const accountNumbers = customer.fields.Accounts.arrayValue.values.map(acc => acc.mapValue.fields.AccountNumber.stringValue);

//           // Step 3: Match and process transactions
//           if (accountNumbers.includes(arrayName)) {
//             const customerID = customer.fields.CustomerID.integerValue;
//             const creditAmount = arrayValues.reduce((sum, item) => sum + parseInt(item.mapValue.fields.creditAmount.integerValue, 10), 0);

//             // Step 4: Store the fetched array into the Transactions collection for the matched CustomerID
//             await storeTransactions(customerID, arrayValues);

//             // Step 5: Update the customer's balance
//             await updateCustomerBalance(customerID, arrayName, creditAmount);

//             // Step 6: Delete the array in common_db
//             await deleteArrayInCommonDB(commonDbUrl, documentId, arrayName);

//             console.log(`Stored transactions for CustomerID: ${customerID}`);
//           }
//         }
//       }
//     }
//   } catch (error) {
//     console.error("Error loading transactions:", error);
//   }
// };

// // Function to store transactions into the customer's Transactions collection
// const storeTransactions = async (customerID, transactionsArray) => {
//   try {
//     const transactionsResponse = await axios.get(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`);
//     const existingTransactions = transactionsResponse.data.fields.Transactions?.arrayValue?.values || [];

//     // Combine existing transactions with new ones, adding Debited field with default value
//     const updatedTransactions = [
//       ...existingTransactions,
//       ...transactionsArray.map(item => ({
//         mapValue: {
//           fields: {
//             ...item.mapValue.fields,
//             Debited: { booleanValue: false } // Add default value for Debited
//           }
//         }
//       }))
//     ];

//     // Update the Transactions collection for the customer
//     await axios.patch(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`, {
//       fields: {
//         Transactions: {
//           arrayValue: {
//             values: updatedTransactions
//           }
//         }
//       }
//     });
//   } catch (error) {
//     console.error(`Error storing transactions for CustomerID ${customerID}:`, error);
//     throw error;
//   }
// };

// // Function to update the customer's balance
// const updateCustomerBalance = async (customerID, accountNumber, creditAmount) => {
//   try {
//     const customerResponse = await axios.get(`${process.env.REACT_APP_CUSTOMERS_URL}/${customerID}`);

//     const accounts = customerResponse.data.fields.Accounts.arrayValue.values;
//     const otherFields = { ...customerResponse.data.fields };
//     delete otherFields.Accounts;

//     const updatedAccounts = accounts.map(account => {
//       if (account.mapValue.fields.AccountNumber.stringValue === accountNumber) {
//         const currentBalance = parseInt(account.mapValue.fields.Balance.integerValue, 10);
//         const newBalance = currentBalance + creditAmount; // Sum the current balance and creditAmount

//         return {
//           mapValue: {
//             fields: {
//               ...account.mapValue.fields,
//               Balance: { integerValue: newBalance } // Update only the Balance field
//             }
//           }
//         };
//       }
//       return account; // Return other accounts unchanged
//     });

//     // Update the customer's accounts with the new balance
//     await axios.patch(`${process.env.REACT_APP_CUSTOMERS_URL}/${customerID}`, {
//       fields: {
//         Accounts: {
//           arrayValue: {
//             values: updatedAccounts
//           }
//         },
//         ...otherFields
//       }
//     });

//     console.log(`Customer ${customerID}'s balance updated successfully.`);
//   } catch (error) {
//     console.error("Error updating balance:", error);
//     throw error;
//   }
// };

// // Function to delete the array in common_db after processing
// const deleteArrayInCommonDB = async (commonDbUrl, documentId, arrayName) => {
//   try {
//     await axios.patch(`${commonDbUrl}/${documentId}`, {
//       fields: {
//         [arrayName]: { // Remove the array by setting it to null
//           arrayValue: { values: [] }
//         }
//       }
//     });
//     console.log(`Deleted array '${arrayName}' from common_db.`);
//   } catch (error) {
//     console.error(`Error deleting array '${arrayName}' in common_db:`, error);
//     throw error;
//   }
// };

// export default LoadTransactions;




import axios from 'axios';

const LoadTransactions = async () => {
  try {
    // Step 1: Fetch the document from common_db using the API link
    const commonDbUrl = process.env.REACT_APP_COMMON_DB_URL; // Store this in your .env file
    const documentId = 'Keerthi6688'; // Use the appropriate document ID as needed

    const commonDbResponse = await axios.get(`${commonDbUrl}/${documentId}`);
    const commonDbData = commonDbResponse.data;

    // Check if the document has fields and process each array
    for (const [arrayName, arrayDetails] of Object.entries(commonDbData.fields)) {
      if (arrayDetails.arrayValue) {
        const arrayValues = arrayDetails.arrayValue.values;

        // Step 2: Fetch customers to match AccountNumber
        const customersResponse = await axios.get(process.env.REACT_APP_CUSTOMERS_URL); // Store this in your .env file
        const customers = customersResponse.data.documents;

        for (const customer of customers) {
          const accountNumbers = customer.fields.Accounts.arrayValue.values.map(acc => acc.mapValue.fields.AccountNumber.stringValue);

          // Step 3: Match and process transactions
          if (accountNumbers.includes(arrayName)) {
            const customerID = customer.fields.CustomerID.integerValue;

            // Step 4: Store the fetched array into the Transactions collection for the matched CustomerID
            await storeTransactions(customerID, arrayValues);

            // Step 5: Calculate and update the customer's balance
            const creditAmount = arrayValues.reduce((sum, item) => sum + parseInt(item.mapValue.fields.creditAmount.integerValue, 10), 0);
            await updateCustomerBalance(customerID, arrayName, creditAmount);

            // Step 6: Delete the array in common_db after processing
            await deleteArrayInCommonDB(commonDbUrl, documentId, arrayName);

            console.log(`Stored transactions for CustomerID: ${customerID}`);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error loading transactions:", error);
  }
};

// // Function to store transactions into the customer's Transactions collection
// const storeTransactions = async (customerID, transactionsArray) => {
//   try {
//     // Fetch existing transactions for the customer
//     const transactionsResponse = await axios.get(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`);
//     const existingTransactions = transactionsResponse.data.fields.Transactions?.arrayValue?.values || [];

//     // Extract existing transaction hashes (using a simple identifier like date or transaction ID)
//     const existingTransactionIDs = new Set(
//       existingTransactions.map(transaction => transaction.mapValue.fields.TransactionID?.stringValue)
//     );

//     // Filter out already processed transactions
//     const newTransactions = transactionsArray.filter(transaction => {
//       const transactionID = transaction.mapValue.fields.TransactionID?.stringValue;
//       return !existingTransactionIDs.has(transactionID);
//     });

//     // If there are new transactions, update the Transactions collection
//     if (newTransactions.length > 0) {
//       const updatedTransactions = [
//         ...existingTransactions,
//         ...newTransactions.map(item => ({
//           mapValue: {
//             fields: {
//               ...item.mapValue.fields,
//               Debited: { booleanValue: false }, // Add default value for Debited
//             }
//           }
//         }))
//       ];

//       // Update the Transactions collection for the customer
//       await axios.patch(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`, {
//         fields: {
//           Transactions: {
//             arrayValue: {
//               values: updatedTransactions
//             }
//           }
//         }
//       });

//       console.log(`Stored new transactions for CustomerID ${customerID}.`);
//     } else {
//       console.log(`No new transactions to store for CustomerID ${customerID}.`);
//     }
//   } catch (error) {
//     console.error(`Error storing transactions for CustomerID ${customerID}:`, error);
//     throw error;
//   }
// };



// Function to store transactions into the customer's Transactions collection
const storeTransactions = async (customerID, transactionsArray) => {
  try {
    const transactionsResponse = await axios.get(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`);
    const existingTransactions = transactionsResponse.data.fields?.Transactions?.arrayValue?.values || [];

    // Combine existing transactions with new ones, adding Debited field with default value
    const updatedTransactions = [
      ...existingTransactions,
      ...transactionsArray.map(item => ({
        mapValue: {
          fields: {
            ...item.mapValue.fields,
            Debited: { booleanValue: false } // Add default value for Debited
          }
        }
      }))
    ];

    // Update the Transactions collection for the customer
    await axios.patch(`${process.env.REACT_APP_FIRESTORE_TRANSACTIONS_URL}/${customerID}`, {
      fields: {
        Transactions: {
          arrayValue: {
            values: updatedTransactions
          }
        }
      }
    });

    console.log(`Transactions stored for CustomerID: ${customerID}`);
  } catch (error) {
    console.error(`Error storing transactions for CustomerID ${customerID}:`, error);
    throw error;
  }
};


// Function to update the customer's balance
const updateCustomerBalance = async (customerID, accountNumber, creditAmount) => {
  try {
    const customerResponse = await axios.get(`${process.env.REACT_APP_CUSTOMERS_URL}/${customerID}`);

    const accounts = customerResponse.data.fields.Accounts.arrayValue.values;
    const otherFields = { ...customerResponse.data.fields };
    delete otherFields.Accounts;

    const updatedAccounts = accounts.map(account => {
      if (account.mapValue.fields.AccountNumber.stringValue === accountNumber) {
        const currentBalance = parseInt(account.mapValue.fields.Balance.integerValue, 10);
        const newBalance = currentBalance + creditAmount; // Sum the current balance and creditAmount

        return {
          mapValue: {
            fields: {
              ...account.mapValue.fields,
              Balance: { integerValue: newBalance } // Update only the Balance field
            }
          }
        };
      }
      return account; // Return other accounts unchanged
    });

    // Update the customer's accounts with the new balance
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

// Function to delete the array in common_db after processing
const deleteArrayInCommonDB = async (commonDbUrl, documentId, arrayName) => {
  try {
    await axios.patch(`${commonDbUrl}/${documentId}`, {
      fields: {
        [arrayName]: { // Remove the array by setting it to null
          arrayValue: { values: [] }
        }
      }
    });
    console.log(`Deleted array '${arrayName}' from common_db.`);
  } catch (error) {
    console.error(`Error deleting array '${arrayName}' in common_db:`, error);
    throw error;
  }
};

export default LoadTransactions;
