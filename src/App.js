import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CustomerPage from "./components/CustomerPage";
import ProfilePage from "./components/ProfilePage"; // Import the ProfilePage component
import Payment from "./components/Payment"; 
import Admin from "./components/Admin"; // Import the Admin component
import PaymentOther from "./components/PaymentOther";
import LoadTransactions from "./components/LoadTransactions"; 
import Loans from "./components/Loans"; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/customer-page" element={<CustomerPage />} />
        <Route path="/profile" element={<ProfilePage />} /> {/* Add route for ProfilePage */}
        <Route path="/payment" element={<Payment />} /> 
        <Route path="/admin" element={<Admin />} />
        <Route path="/payment-other" element={<PaymentOther />} />
        <Route path="/load-transactions" element={<LoadTransactions />} />
        <Route path="/loans" element={<Loans />} />


      </Routes>
    </Router>
  );
}

export default App;
