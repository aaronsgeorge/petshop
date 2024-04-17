export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Calculate total price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  // Calculate shipping price
  state.shippingPrice = addDecimals(Number(state.itemsPrice) > 35 ? 0 : 8);
  // Calculate tax price
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
  // Calculate pre-tax price
  state.preTaxPrice = Number(state.itemsPrice) + Number(state.shippingPrice);
  // Calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);
  // Calculate items number
  state.itemsNumber = state.cartItems.reduce((acc, item) => acc + item.qty, 0);
  // items number text
  state.itemsNumberText =
    state.itemsNumber <= 1
      ? `${state.itemsNumber} item`
      : `${state.itemsNumber} items`;

  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
