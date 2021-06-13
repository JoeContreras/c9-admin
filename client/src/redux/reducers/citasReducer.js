import ACTIONS from "../actions";

const citas = [];

const citasReducer = (state = citas, action) => {
  switch (action.type) {
    case ACTIONS.GET_ALL_CITAS:
      return action.payload;
    default:
      return state;
  }
};

export default citasReducer;
