"use client";
deleteOrderById;

import { deleteOrderById } from "@/lib/action";
import toast from "react-hot-toast";

export const DeleteButton = ({ orderID }) => {
  const handleDelete = async (orderId) => {
    const result = await deleteOrderById(orderId); // Call your server function
    if (result.success) {
      toast.success("Deleted");
    } else {
      toast.error("Error");
    }
  };
  return (
    <div>
      <button className="btn btn-danger" onClick={() => handleDelete(orderID)}>
        X
      </button>
    </div>
  );
};
