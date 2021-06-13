import ACTIONS from "../actions";

const clientes = [];

const clientesReducer = (state = clientes, action) => {
  switch (action.type) {
    case ACTIONS.GET_ALL_CLIENTES:
      return action.payload;
    default:
      return state;
  }
};

export default clientesReducer;
