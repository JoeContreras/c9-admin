import ACTIONS from "./index";
import axios from "axios";

export const fetchAllClientes = async (token) => {
  const res = await axios.get("/admin/clientes", {
    headers: { Authorization: token },
  });
  return res;
};

export const dispatchGetAllClientes = (res) => {
  return {
    type: ACTIONS.GET_ALL_CLIENTES,
    payload: res.data,
  };
};

export const fetchClienteSearch = async (token, searchQuery) => {
  const res = await axios.get(
    `/admin/clientes/search?searchQuery=${searchQuery || "none"}`,
    {
      headers: { Authorization: token },
    }
  );
  return res;
};

export const dispatchGetClienteSearch = (res) => {
  return {
    type: ACTIONS.SEARCH_CLIENTE,
    payload: res.data,
  };
};
