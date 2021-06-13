import { combineReducers } from "redux";
import auth from "./authReducer";
import token from "./tokenReducer";
import users from "./usersReducers";
import clientes from "./clientesReducer";
import citas from "./citasReducer";

export default combineReducers({
  auth,
  token,
  users,
  clientes,
  citas,
});
