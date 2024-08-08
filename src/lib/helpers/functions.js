export const convertCartToArray = (cart) => {
  return Object.keys(cart).map((item) => ({
    name: item,
    quantity: cart[item],
  }));
};
