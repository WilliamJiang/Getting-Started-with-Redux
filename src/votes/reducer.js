const voteReducer = (state = [], action) => {
  switch (action.type) {
    case 'ACTION':
      return [1,2,3,4,5,6]
  }
  return state;
}

export default voteReducer;