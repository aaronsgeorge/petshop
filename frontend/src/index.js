import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
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
import AdminProducts from "./components/admin/AdminProducts";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import AllProductsScreen from "./screens/AllProductsScreen";
import SalesScreen from "./screens/SalesScreen";
import AboutScreen from "./screens/AboutScreen";
import OrderReviewScreen from "./screens/OrderReviewScreen";
import OrderSuccessScreen from "./screens/OrderSuccessScreen";
import OrderDetails from "./components/account/OrderDetails";
import PurchaseHistory from "./components/account/PurchaseHistory";
import AdminEditUser from "./components/admin/AdminEditUser";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/products" element={<AllProductsScreen />} />
      <Route path="/products/:pageNumber" element={<AllProductsScreen />} />
      <Route path="/search/:keyword" element={<AllProductsScreen />} />
      <Route
        path="/search/:keyword/page/:pageNumber"
        element={<AllProductsScreen />}
      />
      <Route path="/sales" element={<SalesScreen />} />
      <Route path="/about" element={<AboutScreen />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/account/*" element={<AccountScreen />}>
          <Route index={true} element={<PurchaseHistory />} />
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
          <Route path="users/:userId" element={<AdminEditUser />} />
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
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
