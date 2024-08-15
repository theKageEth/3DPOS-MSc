import { useState } from "react";
import {
  render,
  Printer,
  Text,
  Row,
  Br,
  Line,
  Cut,
} from "react-thermal-printer";

const PrintButton = ({ order }) => {
  const [device, setDevice] = useState(null);

  const receipt = (
    <Printer type="epson">
      <Text size={{ width: 2, height: 2 }}>{`Order ID: ${order._id}`}</Text>
      <Text bold={true}>Order Summary</Text>
      <Br />
      <Line />
      <Row left="Username" right={order.username} />
      <Row left="Total Amount" right={`$${order.totalAmount.toFixed(2)}`} />
      <Row left="Payment Method" right={order.paymentMethod} />
      <Row left="Status" right={order.status} />
      <Line />
      {order.products.map((product, index) => (
        <Row
          key={index}
          left={`${product.name} x ${product.quantity}`} // Add quantity here
          right={`$${(product.quantity * product.price).toFixed(2)}`}
        />
      ))}
      <Line />
      <Br />
      <Cut />
    </Printer>
  );

  const printOrder = async () => {
    if (!device) {
      console.error("No device selected.");
      return;
    }

    try {
      // Open the device
      await device.open();
      console.log("Device opened successfully.");

      // Claim the first interface
      const configuration = device.configurations[0];
      await device.selectConfiguration(configuration.configurationValue);
      const interfaceNumber = 0; // Change to the correct interface number
      await device.claimInterface(interfaceNumber);
      console.log("Interface claimed successfully.");

      // Get the endpoint for the claim
      const endpointNumber = 1; // Change to the correct endpoint number
      const writer = new Uint8Array(await render(receipt));
      await device.transferOut(endpointNumber, writer);

      console.log("Print data sent successfully.");
      await device.close();
      console.log("Device closed successfully.");
    } catch (error) {
      console.error("Error printing:", error);
    }
  };

  const requestDevice = async () => {
    try {
      const device = await navigator.usb.requestDevice({
        filters: [{ vendorId: 0x04b8 }],
      });
      setDevice(device);
      console.log("Device found:", device);
    } catch (error) {
      console.error("Error requesting device:", error);
    }
  };

  return (
    <div>
      <button
        onClick={requestDevice}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Connect Printer
      </button>
      <button
        onClick={printOrder}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Print
      </button>
    </div>
  );
};

export default PrintButton;
