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

/* Seller Layout */
import SellerLayout from "./components/seller/layout/SellerLayout";

/* Seller Pages */
import SellerDashboard from "./components/seller/dashboard/Dashboard";
import InventoryList from "./components/seller/inventory/InventoryList";
import UpdateStock from "./components/seller/inventory/UpdateStock";
import ReduceStock from "./components/seller/inventory/ReduceStock";
import StockHistory from "./components/seller/inventory/StockHistory";
import CreateSale from "./components/seller/sales/CreateSale";
import VendorPaymentList from "./components/seller/payments/VendorPaymentList";


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

          <Route path="dashboard" element={<Dashboard />} />

          <Route path="supply" element={<MilkSupply />} />

          <Route path="history" element={<SupplyHistory />} />

          <Route path="payments" element={<Payments />} />

          <Route path="profile" element={<Profile />} />

        </Route>

        {/*Seller Module */}

        <Route path="/seller" element={<SellerLayout />}>

        <Route path="dashboard" element={<SellerDashboard />} />

        <Route path="inventory" element={<InventoryList />} />

         <Route path="update-stock" element={<UpdateStock />} />

         <Route path="reduce-stock" element={<ReduceStock />} />

         <Route path="history" element={<StockHistory />} />

         {/*Sales Module*/}

         <Route path="sales/create" element={<CreateSale />} />

         <Route path="payments" element={<VendorPaymentList />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;