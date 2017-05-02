const ubsReducer = (state = [], action) => {
  switch (action.type) {
    case 'CALCULATE':
      return action.payload;
    case 'RESET':
      return [];
  }
  return state;
}

export default ubsReducer;