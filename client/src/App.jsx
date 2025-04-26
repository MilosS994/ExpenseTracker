// IMPORTS
// React Router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Import Pages
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";

// ---------------------------------------------------------------------------------

// ROOT COMPONENT
// This component checks if the user is authenticated and redirects accordingly
const Root = () => {};

// APP COMPONENT
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/signin" element={<SignIn />} /> // SignIn page
          <Route path="/signup" element={<SignUp />} /> // SignUp page
          <Route path="/dashboard" element={<Home />} /> // Dashboard page
          <Route path="/income" element={<Income />} /> // Income page
          <Route path="/expense" element={<Expense />} /> // Expense page
        </Routes>
      </Router>
    </div>
  );
};

export default App;
