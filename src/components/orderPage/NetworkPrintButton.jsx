import { useState } from "react";
import { NetworkPrint } from "@/lib/action";
import {
  render,
  Printer,
  Text,
  Row,
  Br,
  Line,
  Cut,
} from "react-thermal-printer";

const NetworkPrintButton = ({ order }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePrint = async () => {
    setIsLoading(true);

    try {
      const receipt = (
        <Printer type="epson">
          <Text align="center" bold size={{ width: 2, height: 2 }}>
            3D POS
          </Text>
          <Br />
          <Text size={{ width: 2, height: 2 }}>
            {`Order for: ${order.username}`}
          </Text>
          <Text bold={true}>Order Summary</Text>
          <Br />
          <Line />

          <Row left="Payment Method" right={order.paymentMethod} />
          <Row left="Status" right={order.status} />
          <Line />
          {order.products.map((product, index) => (
            <Row
              key={index}
              left={`${product.quantity} x $${product.price.toFixed(2)} | ${
                product.name
              }`} // Quantity and Name on the left
              right={`$${(product.quantity * product.price).toFixed(2)}`} // Total price on the right
            />
          ))}
          <Line />
          <Br />
          <Row left="Total Amount" right={`$${order.totalAmount.toFixed(2)}`} />
          <Br />
          <Line />
          <Br />
          <Text align="center" bold size={{ width: 2, height: 2 }}>
            Thank you
          </Text>
          <Br />
          <Cut />
        </Printer>
      );

      const data = await render(receipt);

      // Call NetworkPrint with the rendered data
      await NetworkPrint(data);

      console.log("Print job sent successfully");
    } catch (error) {
      console.log(`Error sending print job: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlePrint}
      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      disabled={isLoading}
    >
      {isLoading ? "Printing..." : "Print to Network Printer"}
    </button>
  );
};

export default NetworkPrintButton;
