import { useState } from "react";

const RequestPrinter = ({ setDevice }) => {
  const requestDevice = async () => {
    try {
      const device = await navigator.usb.requestDevice({
        filters: [{ vendorId: 0x04b8 }], // Filter for your vendor ID
      });
      setDevice(device); // Update parent state
      console.log("Device found:", device);
    } catch (error) {
      console.error("Error requesting device:", error);
    }
  };

  return (
    <button
      onClick={requestDevice}
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
    >
      Connect Printer
    </button>
  );
};

export default RequestPrinter;
