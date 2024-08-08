import { FaTrashAlt } from "react-icons/fa";
import { PRODUCTS } from "@/lib/helpers/contants"; // Make sure the path is correct
import toast, { Toaster } from "react-hot-toast";
import { useFormState, useFormStatus } from "react-dom";
import { useState, useEffect } from "react";
import { addOrder } from "@/lib/action";

const Cart = ({ cart, addToCart, removeFromCart, deleteFromCart, userId }) => {
  const [state, FormState] = useFormState(addOrder, null);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  // Calculate the total price
  const totalPrice = Object.keys(cart).reduce((total, itemName) => {
    const product = PRODUCTS.find((product) => product.name === itemName);
    const itemPrice = product ? product.price * cart[itemName] : 0;
    return total + itemPrice;
  }, 0);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

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
      <div className="absolute top-10 right-20 bg-white text-black p-6 rounded-lg shadow-lg z-50">
        <h2 className="text-xl font-bold mb-4">Cart</h2>
        <ul className="space-y-2">
          {Object.keys(cart).length === 0 ? (
            <li>Your cart is empty</li>
          ) : (
            Object.keys(cart).map((item) => (
              <li
                key={item}
                className="flex items-center justify-between gap-2"
              >
                <span className="list-disc list-inside">{item}</span>
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-blue-500 py-1 px-2 rounded hover:bg-blue-400"
                    onClick={() => addToCart(item)}
                  >
                    +
                  </button>
                  <span>{cart[item]}</span>
                  <button
                    className="bg-red-500 py-1 px-2 rounded hover:bg-red-400"
                    onClick={() => removeFromCart(item)}
                  >
                    -
                  </button>
                  <button
                    className="py-2 px-2 rounded hover:bg-red-600"
                    onClick={() => deleteFromCart(item)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
        {/* Display the total price */}
        {Object.keys(cart).length > 0 && (
          <div className="mt-4 text-lg font-bold">
            Total Price: ${totalPrice.toFixed(2)}
          </div>
        )}
        {/* Order form */}
        {Object.keys(cart).length > 0 && (
          <form
            className="pt-4 flex flex-col gap-1 bg-gray-100 p-4 rounded-lg mt-4"
            action={FormState}
          >
            <h3 className="text-xl mb-4 font-bold text-center">
              Place Your Order
            </h3>
            <div className="mb-2">
              <label
                htmlFor="paymentMethod"
                className="block text-sm font-medium mb-1"
              >
                Payment Method
              </label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                className="rounded border-gray-300 w-full px-3 py-2"
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
