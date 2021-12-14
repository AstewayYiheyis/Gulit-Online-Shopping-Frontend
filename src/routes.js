import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardApp from "./pages/DashboardApp";
import Products from "./pages/Products";
import Blog from "./pages/Blog";
import User from "./pages/User";
import Address from "./pages/Address";
import NotFound from "./pages/Page404";
import ProductInput from "./pages/ProductInput";
import BuyerRegister from "./pages/BuyerRegister"
import SellerRegister from "./pages/SellerRegister"

import ProductDetail from "./pages/ProductDetail";
import Cart from "./layouts/Cart";
import ApproveSeller from "./pages/ApproveSeller";
import Order from "./pages/Order"
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: "app", element: <DashboardApp /> },
        { path: "user", element: <User /> },
        { path: "products", element: <Products /> },
        {path: "product", element: <ProductInput/>},
        {path: "addresses", element: <Address/>},
        { path: "checkout", element: <Cart /> },
        { path: "products/:id", element: <ProductDetail /> },
        { path: "blog", element: <Blog /> },
        { path: "approveSeller", element: <ApproveSeller /> },
        { path: "orders", element: <Order /> },
      ],
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "seller-register", element: <SellerRegister /> },
        { path: "buyer-register", element: <BuyerRegister /> },
        { path: "404", element: <NotFound /> },
        { path: "/", element: <Navigate to="/dashboard" /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
