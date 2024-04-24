import OrdersTable from "./OrdersTable";
import { useGetMyOrdersQuery } from "../../slices/ordersApiSlice";

const AccountOrderHistory = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  return <OrdersTable orders={orders} isLoading={isLoading} error={error} />;
};

export default AccountOrderHistory;
