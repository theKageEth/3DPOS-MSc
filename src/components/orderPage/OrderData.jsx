"use client";
import { useState, useEffect } from "react";
import { DeleteButton } from "@/components/orderPage/DeleteButton";
import PageControl from "./PageControl";

const OrderData = ({ orders }) => {
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [usernameFilter, setUsernameFilter] = useState("");

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
        />
        {currentOrders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="overflow-x-auto h-96 text-center">
            <table className="table table-xs table-pin-rows ">
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
              <tbody className="table-pin-cols ">
                {currentOrders.map((order, index) => (
                  <tr key={order._id}>
                    <th>{index + 1}</th>
                    <td>{order._id}</td>
                    <td>{order.userId}</td>
                    <td>{order.username}</td>
                    <td>${order.totalAmount.toFixed(2)}</td>
                    <td>{order.paymentMethod}</td>
                    <td>{order.status}</td>
                    <td>
                      {order.products.map((product, index) => (
                        <div key={index}>
                          {product.name} - {product.quantity}
                        </div>
                      ))}
                    </td>
                    <td>
                      <DeleteButton orderID={order._id} />
                    </td>
                    <th></th>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th>
                    <td></td>
                  </th>
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
