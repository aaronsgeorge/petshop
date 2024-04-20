import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import ImageContainer from "../ImageContainer";
import { Row, Col, Table, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useGetOrderDetailsQuery } from "../../slices/ordersApiSlice";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const { userInfo } = useSelector((state) => state.auth);

  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);

  const isNotAuthorized = !isLoading && order?.user?._id !== userInfo._id;

  const isAuthorized = !isLoading && order && order?.user?._id === userInfo._id;

  return (
    <div className="order-details">
      <h6 className="fw-bold text-primary">
        <Link to="/account" className="text-primary back-link">
          Purchase History
        </Link>
        <FaAngleRight className="mx-1" />
        Order Details
      </h6>

      <div>
        {isLoading && <p>Loading Order Details...</p>}

        {error ? (
          <p>Error: {error?.data?.message || error.error}</p>
        ) : (
          isNotAuthorized && <p>You are not authorized to view this order</p>
        )}

        {isAuthorized && (
          <div>
            <p className="mt-3">
              <span className="text-black-50">Ordered on</span>{" "}
              {order.createdAt.substring(0, 10)}&nbsp;&nbsp;
              <span className="text-black-50">
                {" | "}&nbsp;&nbsp;Order ID:
              </span>{" "}
              {orderId}
            </p>
            <Card className="p-3">
              <Row>
                <Col>
                  <h6 className="order-lable">Shipping Address</h6>
                  <p>
                    {order.shippingAddress.firstName}{" "}
                    {order.shippingAddress.lastName}, <br />
                    {order.shippingAddress.address}
                    <br />
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                </Col>
                <Col>
                  <h6 className="order-lable">Order Summary</h6>
                  <div>
                    <p>
                      Items: ${order.itemsPrice}
                      <br />
                      Shipping: ${order.shippingPrice} <br />
                      Tax: ${order.taxPrice} <br />
                      Total: ${order.totalPrice}
                    </p>
                  </div>
                </Col>
                <Col>
                  <h6 className="order-lable">Payment Method</h6>
                  <p>{order.paymentMethod}</p>
                  <h6 className="order-lable">Order Status</h6>
                  <p>
                    {order.isDelivered
                      ? `Delivered on ${order.deliveredAt}`
                      : "Not Delivered"}
                    <br />
                    {order.isPaid ? `Paid on ${order.paidAt}` : "Not Paid"}
                  </p>
                </Col>
              </Row>
            </Card>

            <Card className="p-3 mt-4">
              <Table className="table table-striped table-hover table-style">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th></th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item) => (
                    <tr key={item.product}>
                      <td style={{ width: "50px" }}>
                        <div
                          onClick={() => navigate(`/product/${item.product}`)}
                        >
                          <ImageContainer
                            src={item.image}
                            alt={item.name}
                            className="img-thumbnail"
                            size="48px"
                          />
                        </div>
                      </td>
                      <td>
                        <Link
                          to={`/product/${item.product}`}
                          className="text-black"
                        >
                          {item.name}
                        </Link>
                      </td>
                      <td>{item.qty}</td>
                      <td>{item.price}</td>
                      <td>{item.qty * item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
