import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

/* Landing & Authentication */
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ChangePassword from "./pages/auth/ChangePassword";

/* Vendor Layout */
import VendorLayout from "./components/vendor/layout/VendorLayout";

/* Vendor Pages */
import Dashboard from "./pages/vendor/Dashboard";
import MilkSupply from "./pages/vendor/MilkSupply";
import SupplyHistory from "./pages/vendor/SupplyHistory";
import Payments from "./pages/vendor/Payments";
import Profile from "./pages/vendor/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />

        {/* Vendor Module */}

        <Route path="/vendor" element={<VendorLayout />}>

          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          <Route
            path="supply"
            element={<MilkSupply />}
          />

          <Route
            path="history"
            element={<SupplyHistory />}
          />

          <Route
            path="payments"
            element={<Payments />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;