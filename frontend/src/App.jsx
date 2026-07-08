import VendorSupply from "./pages/dashboard/VendorSupply"; 
import VendorHistory from "./pages/dashboard/VendorHistory"; 
import VendorProfile from "./pages/dashboard/VendorProfile";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ChangePassword from "./pages/auth/ChangePassword";
import VendorDashboard from "./pages/dashboard/VendorDashboard";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/change-password"
          element={<ChangePassword />}
        />

        <Route 
           path="/vendor-dashboard" 
           element={<VendorDashboard />} 
        />

        <Route
          path="/vendor/supply"
          element={<VendorSupply />}
        />

        <Route
           path="/vendor/history"
           element={<VendorHistory />}
        />

        <Route
          path="/vendor/profile"
          element={<VendorProfile />} 
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;