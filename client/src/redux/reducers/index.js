import { combineReducers } from "redux";
import auth from "./authReducer";
import token from "./tokenReducer";
import users from "./usersReducers";
import clientes from "./clientesReducer";

export default combineReducers({
  auth,
  token,
  users,
  clientes,
});
