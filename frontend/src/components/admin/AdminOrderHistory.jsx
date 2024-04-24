import OrdersTable from "../account/OrdersTable";
import { useParams } from "react-router-dom";
import { useGetOrdersByUserIdQuery } from "../../slices/ordersApiSlice";

const AdminOrderHistory = () => {
  const { userId } = useParams();
  const { data: orders, isLoading, error } = useGetOrdersByUserIdQuery(userId);

  return (
    <OrdersTable
      isInAdmin
      orders={orders}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default AdminOrderHistory;
