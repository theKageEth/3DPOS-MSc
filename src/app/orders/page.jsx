import OrderData from "@/components/orderPage/OrderData";
import { getAllOrders } from "@/lib/data";

const OrdersPage = async () => {
  const data = await getAllOrders();

  return (
    <>
      <OrderData orders={data} />
    </>
  );
};

export default OrdersPage;
