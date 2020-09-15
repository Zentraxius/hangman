export default (state = {}, action) => {
  const { id, name, price } = action;
  switch (action.type) {
  case 'ADD_PRODUCT':
    return Object.assign({}, state, {
      [id]: {
        name: name,
        price: price,
        id: id
      }
    });
  default:
      return state;
  }
};