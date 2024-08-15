import { PRODUCTS } from "./contants";

export const convertCartToArray = (cart) => {
  return Object.keys(cart).map((item) => {
    // Find the product details
    const product = PRODUCTS.find((p) => p.name === item);

    // Calculate price and total
    const price = product ? product.price : 0;
    const quantity = cart[item];
    const total = price * quantity;

    return {
      name: item,
      quantity: quantity,
      price: price,
      total: total, // No toFixed here, keep it as a number
    };
  });
};
