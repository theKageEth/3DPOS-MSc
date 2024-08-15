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

const PrintButton = ({ order, device }) => {
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
      <Row left="Total Amount" right={`$${order.totalAmount.toFixed(2)}`} />
      <Row left="Payment Method" right={order.paymentMethod} />
      <Row left="Status" right={order.status} />
      <Line />
      {order.products.map((product, index) => (
        <Row
          key={index}
          left={`${product.name} x ${product.quantity}`}
          right={`$${product.price.toFixed(2)} | $${(
            product.quantity * product.price
          ).toFixed(2)}`}
        />
      ))}
      <Line />
      <Br />
      <Text align="center" bold size={{ width: 2, height: 2 }}>
        Thank you
      </Text>
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
      await device.open(); // Open the device
      console.log("Device opened successfully.");

      const configuration = device.configurations[0];
      await device.selectConfiguration(configuration.configurationValue);
      const interfaceNumber = 0; // Adjust to correct interface number
      await device.claimInterface(interfaceNumber);
      console.log("Interface claimed successfully.");

      const endpointNumber = 1; // Adjust to correct endpoint number
      const data = await render(receipt); // Generate print data
      const writer = new Uint8Array(data); // Convert to Uint8Array
      await device.transferOut(endpointNumber, writer); // Send data to printer

      console.log("Print data sent successfully.");
      await device.close(); // Close the device
      console.log("Device closed successfully.");
    } catch (error) {
      console.error("Error printing:", error);
    }
  };

  return (
    <div>
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
