"use server";
import { connect } from "node:net";
import { revalidatePath } from "next/cache";
import { User, Order } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";
import { convertCartToArray } from "./helpers/functions";
import { redirect } from "next/navigation";

export const NetworkPrint = async (data) => {
  const conn = connect(
    {
      host: "192.168.123.100", // Printer's IP address
      port: 9100, // Standard port for network printers
      timeout: 5000, // Connection timeout in milliseconds
    },
    () => {
      conn.write(Buffer.from(data), () => {
        console.log("Print data sent successfully.");
        conn.destroy(); // Close the connection
      });
    }
  );

  conn.on("error", (err) => {
    console.error("Error connecting to the printer:", err);
  });
};

export const addOrder = async (prevState, formData) => {
  const { products, totalAmount, paymentMethod, userId } =
    Object.fromEntries(formData);

  try {
    connectToDb();

    // Retrieve the username from the User model
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const parsedCart = JSON.parse(products);
    const formattedCart = convertCartToArray(parsedCart);

    // Create a new order
    const newOrder = new Order({
      userId,
      username: user.username, // Include the username
      totalAmount: parseFloat(totalAmount),
      paymentMethod,
      products: formattedCart, // Convert cart from JSON string to Map
    });

    const savedOrder = await newOrder.save();

    revalidatePath("/orders");
    revalidatePath("/menu");
    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Failed to place order. Please try again." };
  }
};

export const deleteOrderById = async (orderId) => {
  try {
    await Order.findByIdAndDelete(orderId);
    revalidatePath("/orders");
    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.error("Error deleting order:", err);
    return { error: "Failed to delete order." };
  }
};

export const addUser = async (prevState, formData) => {
  const { username, email, password, img } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newUser = new User({
      username,
      email,
      password,
      img,
    });

    await newUser.save();
    console.log("saved to db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const handleLogout = async () => {
  "use server";
  await signOut();
};

//Register and login functions
export const register = async (previousState, formData) => {
  const { username, email, password, img, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
    connectToDb();

    const user = await User.findOne({ username });

    if (user) {
      return { error: "Username already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
    });

    await newUser.save();

    return {
      success: true,
      message: "Account Created, You will be redirected to login",
    };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const login = async (currentState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
    revalidatePath("/orders");
    revalidatePath("/menu");
    revalidatePath("/admin");
    revalidatePath("/");
    redirect("/");
  } catch (err) {
    console.log(err);
    if (err.type === "CallbackRouteError" || err.code === "credentials") {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};
