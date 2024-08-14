import mongoose from "mongoose";

let MONGODB_URI;

const connection = {};
if (process.env.NODE_ENV === "development") {
  MONGODB_URI = process.env.DEV_MONGODB_URI;
} else {
  MONGODB_URI = process.env.MONGODB_URI;
}

export const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    const db = await mongoose.connect(process.env.MONGODB_URI);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
