const Cart = ({ cart, addToCart, removeFromCart, deleteFromCart }) => (
  <div className="absolute top-10 right-10 bg-white text-black p-6 rounded-lg shadow-lg z-20">
    <h2 className="text-xl font-bold mb-4">Cart</h2>
    <ul className="space-y-2">
      {Object.keys(cart).length === 0 ? (
        <li>Your cart is empty</li>
      ) : (
        Object.keys(cart).map((item) => (
          <li key={item} className="flex items-center justify-between">
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
                className="bg-red-700 py-1 px-2 rounded hover:bg-red-600"
                onClick={() => deleteFromCart(item)}
              >
                Delete
              </button>
            </div>
          </li>
        ))
      )}
    </ul>
  </div>
);

export default Cart;
