import React from "react";
import {Navigate} from "react-router-dom";

import {lazyImport} from "./utils/lazyImport";
import Authenticate from "./pages/auth/authentication/Authenticate";
import DashboardLayout from "./components/Layout";


// Lazy loaded pages using your helper
const Login = lazyImport(() => import("./pages/auth/Login"));
const ForgotPassword = lazyImport(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazyImport(() => import("./pages/auth/ResetPassword"));
const Profile = lazyImport(() => import("./pages/Profile"));
const AddVendorPage = lazyImport(() => import("./pages/agent/AddVendorPage"));
const TemplePoojariForm = lazyImport(() =>
  import("./pages/agent/TemplePoojariForm")
);
const PoojaStoreForm = lazyImport(() => import("./pages/agent/PoojaStoreForm"));
const AddPoojaPartner = lazyImport(() => import("./pages/agent/AddPoojaPartner"));
const PoojaStoreServices = lazyImport(() =>
  import("./pages/agent/PoojaStoreServices")
);
const TempleDetailsForm = lazyImport(() =>
  import("./pages/agent/AddTempleDetails")
);
const TempleAdditions = lazyImport(() =>
  import("./pages/agent/TempleAdditions")
);
const PoojaStoreDetails = lazyImport(() => import("./pages/agent/PoojaStoreDetails"));
const AddEditAgent = lazyImport(() => import("./pages/admin/AddEditAgent"));
const LoginWithOTP = lazyImport(() => import("./pages/auth/LoginWithOTP"));
const NearbySearch = lazyImport(() => import("./pages/citizen/NearbySearch"));
const PoojaStore = lazyImport(() => import("./pages/citizen/PoojaStore"));
const MyCart = lazyImport(() => import("./pages/citizen/MyCart"));
const MyOrders = lazyImport(() => import("./pages/citizen/MyOrders"));
const SingleTempleDetail = lazyImport(() =>
  import("./pages/citizen/SingleTempleDetails")
);
const PoojariProfile = lazyImport(() => import("./pages/poojari/PoojariProfile"));
const AgentDashboard = lazyImport(() => import("./pages/agent/AgentDashboard"));
const PoojariDashboard = lazyImport(() => import("./pages/poojari/PoojariDashboard"));
const PoojaStoreDashboard = lazyImport(() =>
  import("./pages/pooja-store/PoojaStoreDashboard")
);

const Agents =lazyImport(() => import("./pages/admin/Agents"));
// ✅ Use named export
export const routesConfig = [
  // Citizen Routes
  {
    path: "/citizen",
    element: <DashboardLayout showSideBar={false} />,
    children: [
      {index: true, element: <Navigate to="/auth/login" replace />},
      {path: "near-by", element: <NearbySearch />},
      {path: "pooja", element: <PoojaStore />},
      {path: "temple-full-details", element: <SingleTempleDetail />},
      {path: "poojari-details", element: <PoojariProfile />},
      {path: "my-orders", element: <MyOrders />},
      {path: "my-cart", element: <MyCart />},

    ],
  },
  // Poojari Routes
  {
    path: "/poojari",
    element: <Authenticate />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {index: true, element: <Navigate to="dashboard" replace />},
          {path: "profile", element: <PoojariProfile />},
          {path: "dashboard", element: <PoojariDashboard />},
        ],
      },
    ],
  },
  //  Agent Routes
  {
    path: "/agent",
    element: <Authenticate />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {index: true, element: <Navigate to="dashboard" replace />},

          {
            path: "dashboard",
            element: <AgentDashboard />,
          },
          {path: "vendor", element: <AddVendorPage />},
          {path: "temple", element: <TempleDetailsForm />},
          {path: "add-temple", element: <TemplePoojariForm />},
          {path: "temple-additions", element: <TempleAdditions />},
          {path: "pooja-store", element: <PoojaStoreDetails />},
          {path: "add-partner", element: <AddPoojaPartner />},
          {path: "add-pooja-store", element: <PoojaStoreForm />},
          {path: "services", element: <PoojaStoreServices />},
        ],
      },
    ],
  },
  // Admin Routes
  {
    path: "/admin",
     element: <Authenticate />,
    children: [
       { element: <DashboardLayout />,
      children: [
      {index: true, element:<Navigate to="agents" replace />},
      {path: "agent", element: <AddEditAgent />},
      {path: "agent/edit/:id", element: <AddEditAgent />},
      {path: "agents", element: <Agents />},
    ],}
    ],
  },
  // Pooja Store Routes
  {
    path: "/pooja-store",
     element: <Authenticate />,
    children: [
       { element: <DashboardLayout />,
      children: [
      {index: true, element:<Navigate to="dashboard" replace />},
      {path: "dashboard", element: <PoojaStoreDashboard />},
    ],}
    ],
  },
  //  Authentication
  {
    path: "/auth",
    children: [
      {index: true, element: <Login />},
      {path: "login", element: <Login />},
      {path: "forgot-password", element: <ForgotPassword />},
      {path: "reset-password", element: <ResetPassword />},
      {path: "profile", element: <Profile />},
      {path: "user-login", element: <LoginWithOTP />},
      {path: "add-agent", element: <AddEditAgent />},
    ],
  },
  // Temple Routes

  {
    path: "/temple",
     element: <Authenticate />,
    children: [
       { element: <DashboardLayout />,
      children: [
      {index: true, element:<Navigate to="dashboard" replace />},
      {path: "dashboard", element: <PoojariDashboard />},
    ],}
    ],
  },
  {
    path: "*",
    element: <Navigate to="/auth/login" replace />,
  },
];
