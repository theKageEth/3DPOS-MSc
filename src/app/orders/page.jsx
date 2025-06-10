import OrderData from "@/components/orderPage/OrderData";
import { getAllOrders } from "@/lib/data";

const OrdersPage = async () => {
 const data = [
  {
    _id: 'order-1',
    userId: 'user-123',
    username: 'John Doe',
    totalAmount: 45.50,
    paymentMethod: 'Card',
    status: 'Preparing',
  },
  {
    _id: 'order-2',
    userId: 'user-456',
    username: 'Jane Smith',
    totalAmount: 27.99,
    paymentMethod: 'Cash',
    status: 'Delivered',
  },
  {
    _id: 'order-3',
    userId: 'user-789',
    username: 'Alex Johnson',
    totalAmount: 15.00,
    paymentMethod: 'Card',
    status: 'Pending',
  },
];


  return (
    <>
      <OrderData orders={data} />
    </>
  );
};

export default OrdersPage;
