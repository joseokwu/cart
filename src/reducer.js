const reducer = (state, action) => {
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] };
  }
  if (action.type === 'REMOVE_ITEM') {
    const filtered = state.cart.filter((item) => action.payload !== item.id);
    return { ...state, cart: filtered };
  }
  if (action.type === 'TOGGLE_ITEM') {
    const newCart = state.cart
      .map((item) => {
        console.log(action.payload.id, item.id);
        if (action.payload.id === item.id) {
          if (action.payload.text === 'increase') {
            return { ...item, amount: item.amount + 1 };
          } else if (action.payload.text === 'decrease') {
            return { ...item, amount: item.amount - 1 };
          }
        }
        return item;
      })
      .filter((item) => item.amount !== 0);
    return { ...state, cart: newCart };
  }
  if (action.type === 'UPDATE') {
    let { amount, total } = state.cart.reduce(
      (cartTotal, cartItems) => {
        const sum = cartItems.amount * cartItems.price;
        cartTotal.amount += cartItems.amount;
        cartTotal.total += sum;
        return cartTotal;
      },
      {
        amount: 0,
        total: 0,
      }
    );
    total = parseFloat(total.toFixed(2));
    return { ...state, amount, total };
  }

  if (action.type === 'LOADING') {
    return { ...state, loading: true };
  }
  if (action.type === 'DISPLAY') {
    return { ...state, cart: action.payload, loading: false };
  }

  return state;
};

export default reducer;
