import { Table } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const OrdersTable = ({ isInAdmin, orders, isLoading, error }) => {
  return (
    <>
      <h6 className="fw-bold text-primary">Purchase History</h6>

      {isLoading ? (
        <p>Loading Purchase History...</p>
      ) : error ? (
        <p>Error: {error?.data?.message || error.error}</p>
      ) : orders?.length === 0 ? (
        <p>No purchase history found.</p>
      ) : (
        <Table striped hover responsive className="table-style">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes className="text-primary" />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes className="text-primary" />
                  )}
                </td>
                <td>
                  <Link
                    to={
                      isInAdmin
                        ? `/admin/orders/${order._id}`
                        : `/account/order/${order._id}`
                    }
                    className="text-primary"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrdersTable;
