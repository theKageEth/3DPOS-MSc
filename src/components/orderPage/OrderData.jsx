"use client";
import { useState, useEffect } from "react";
import { DeleteButton } from "@/components/orderPage/DeleteButton";
import PageControl from "./PageControl";
import PrintButton from "./PrintButton";
import RequestPrinter from "./RequestPrinter";
import NetworkPrintButton from "./NetworkPrintButton";

const OrderData = ({ orders }) => {
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [usernameFilter, setUsernameFilter] = useState("");
  const [device, setDevice] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    setAllOrders(orders);
    setFilteredOrders(orders);
  }, [orders]);

  const filterOrders = (username) => {
    if (username.trim() === "") {
      setFilteredOrders(allOrders);
    } else {
      const filtered = allOrders.filter((order) =>
        order.username.toLowerCase().includes(username.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setUsernameFilter(value);
    filterOrders(value);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <input
          type="text"
          placeholder="Filter by username"
          value={usernameFilter}
          onChange={handleInputChange}
          className="mb-4 p-2 border rounded"
        />{" "}
        <RequestPrinter setDevice={setDevice} />
        <p>Device Name: {device?.productName}</p>
        <p>Serial Number: {device?.serialNumber}</p>
        {currentOrders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="overflow-x-auto h-96 text-center">
            <table className="table table-xs table-pin-cols ">
              <thead>
                <tr>
                  <th></th>
                  <th>Order ID</th>
                  <th>User ID</th>
                  <th>Username</th>
                  <th>Total Amount</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                  <th>Products</th>
                  <th>Actions</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order, orderIndex) => (
                  <tr key={order._id}>
                    <th>{orderIndex + 1}</th>
                    <td>{order._id}</td>
                    <td>{order.userId}</td>
                    <th>{order.username}</th>
                    <td>${order.totalAmount.toFixed(2)}</td>
                    <td>{order.paymentMethod}</td>
                    <td>{order.status}</td>
                    <td>
                      <div className="overflow-x-auto">
                        <table className="table table-xs">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Quantity</th>
                              <th>Price</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.products.map((product, productIndex) => (
                              <tr key={productIndex}>
                                <td>{product.name}</td>
                                <td>{product.quantity}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>
                                  $
                                  {(product.quantity * product.price).toFixed(
                                    2
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                    <td>
                      <DeleteButton orderID={order._id} />
                      <PrintButton order={order} device={device} />
                      <NetworkPrintButton order={order} />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
        <PageControl
          currentPage={currentPage}
          totalPages={Math.ceil(filteredOrders.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default OrderData;
