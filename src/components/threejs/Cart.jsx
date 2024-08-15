import { FaTrashAlt } from "react-icons/fa";
import { PRODUCTS } from "@/lib/helpers/contants"; // Make sure the path is correct
import toast, { Toaster } from "react-hot-toast";
import { useFormState, useFormStatus } from "react-dom";
import { useState, useEffect } from "react";
import { addOrder } from "@/lib/action";

const Cart = ({ cart, addToCart, removeFromCart, deleteFromCart, userId }) => {
  const [state, FormState] = useFormState(addOrder, null);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  // Calculate total price and prepare product details
  const productDetails = {};
  const totalPrice = Object.keys(cart).reduce((total, itemName) => {
    const product = PRODUCTS.find((product) => product.name === itemName);
    if (product) {
      const itemTotal = product.price * cart[itemName];
      productDetails[itemName] = {
        quantity: cart[itemName],
        price: product.price,
        total: itemTotal,
      };
      return total + itemTotal;
    }
    return total;
  }, 0);

  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  useEffect(() => {
    console.log(cart);
  }, [cart]);
  useEffect(() => {
    if (state?.success) {
      setButtonDisabled(true);
      const redirectTimer = setTimeout(() => {
        toast.success("Thank you!");
        location.reload();
      }, 3000); // 3000 milliseconds = 3 seconds

      return () => clearTimeout(redirectTimer);
    }
  }, [state?.success]);

  function Submit() {
    const status = useFormStatus();
    const buttonText = status.pending
      ? "Submitting..."
      : isButtonDisabled
      ? "In The Kitchen"
      : "Place Order";
    return (
      <button
        type="submit"
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mt-4 hover:bg-blue-600 transition"
        disabled={status.pending || isButtonDisabled}
      >
        {buttonText}
      </button>
    );
  }

  return (
    <>
      <div className="absolute top-10 right-0 md:right-10 lg:right-20 bg-white text-black p-6 rounded-lg shadow-lg z-50 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-center ">Cart</h2>
        <ul className="space-y-4">
          {Object.keys(cart).length === 0 ? (
            <li className="text-center text-gray-500">Your cart is empty</li>
          ) : (
            Object.keys(cart).map((item) => (
              <li
                key={item}
                className="flex flex-col  items-start justify-between gap-2 border-b border-gray-200 pb-4"
              >
                <div className="flex items-center justify-between w-full ">
                  <span className="text-lg font-bold">{item}</span>
                  <div className="flex items-center space-x-2 ml-2">
                    <button
                      className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                    <span className="text-lg font-medium">{cart[item]}</span>
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                      onClick={() => removeFromCart(item)}
                    >
                      -
                    </button>
                    <button
                      className=" text-black py-1 px-2 rounded hover:scale-150 ease-in-out transition duration-500  f "
                      onClick={() => deleteFromCart(item)}
                    >
                      <FaTrashAlt className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className=" my-2  flex flex-col justify-center ">
                  <div className="text-sm font-medium text-gray-700">
                    Price: ${productDetails[item]?.price.toFixed(2)}
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    Total: ${productDetails[item]?.total.toFixed(2)}
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
        {/* Display the total price */}
        {Object.keys(cart).length > 0 && (
          <div className="mt-4 text-lg font-bold border-t border-gray-300 pt-2 text-right">
            Total Price: ${totalPrice.toFixed(2)}
          </div>
        )}
        {/* Order form */}
        {Object.keys(cart).length > 0 && (
          <form
            className="pt-4 flex flex-col gap-4 bg-gray-100 p-4 rounded-lg mt-4"
            action={FormState}
          >
            <h3 className="text-xl mb-4 font-bold text-center">
              Place Your Order
            </h3>
            <div className="mb-4">
              <label
                htmlFor="paymentMethod"
                className="block text-sm font-medium mb-2 text-gray-700"
              >
                Payment Method
              </label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
              </select>
            </div>
            <input type="hidden" name="userId" value={userId} />
            <input type="hidden" name="totalAmount" value={totalPrice} />
            <input type="hidden" name="products" value={JSON.stringify(cart)} />
            <Submit />
            {state?.error && (
              <p className="mt-2 text-red-500 text-center">{state.error}</p>
            )}
            {state?.success && (
              <p className="mt-2 text-green-500 text-center">
                Order placed successfully!
              </p>
            )}
          </form>
        )}
      </div>
    </>
  );
};

export default Cart;
