export default (state = {}, action) => {
  const { id, question } = action;
  switch (action.type) {
  case 'ADD_QUESTION':
    return Object.assign({}, state, {
      [id]: {
        question: question,
        id: id
      }
    });
  default:
      return state;
  }
};