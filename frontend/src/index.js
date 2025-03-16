import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AdminRoute from "./components/route/AdminRoute";
import PrivateRoute from "./components/route/PrivateRoute";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AdminScreen from "./screens/AdminScreen";
import AccountScreen from "./screens/AccountScreen";
import AdminOrders from "./components/admin/AdminOrders";
import AdminUsers from "./components/admin/AdminUsers";
import AdminUserDetails from "./components/admin/AdminUserDetails";
import AdminProducts from "./components/admin/AdminProducts";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import AllProductsScreen from "./screens/AllProductsScreen";
import SalesScreen from "./screens/SalesScreen";
import AboutScreen from "./screens/AboutScreen";
import Veterinary from "./screens/Veterinary";
import Post from "./screens/Post";
import OrderReviewScreen from "./screens/OrderReviewScreen";
import OrderSuccessScreen from "./screens/OrderSuccessScreen";
import OrderDetails from "./components/account/OrderDetails";
import AccountOrderHistory from "./components/account/AccountOrderHistory";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/products" element={<AllProductsScreen />} />
      <Route
        path="/search/:keyword?/category/:category?/sort/:sort?/page/:pageNumber?"
        element={<AllProductsScreen />}
      />
      <Route path="/sales" element={<SalesScreen />} />
      <Route path="/about" element={<AboutScreen />} />
      <Route path="/vet" element={<Veterinary />} />
      <Route path="/post" element={<Post/>} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/account/*" element={<AccountScreen />}>
          <Route index={true} element={<AccountOrderHistory />} />
          <Route path="order/:orderId" element={<OrderDetails />} />
        </Route>

        <Route path="/revieworder" element={<OrderReviewScreen />} />
        <Route path="/ordersuccess/:orderId" element={<OrderSuccessScreen />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/*" element={<AdminScreen />}>
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:orderId" element={<OrderDetails />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/:userId" element={<AdminUserDetails />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
