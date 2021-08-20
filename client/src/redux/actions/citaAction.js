import ACTIONS from "./index";
import axios from "axios";

export const fetchAllCitas = async (token) => {
  const res = await axios.get("/admin/citas", {
    headers: { Authorization: token },
  });
  return res;
};

export const dispatchGetAllCitas = (res) => {
  return {
    type: ACTIONS.GET_ALL_CITAS,
    payload: res.data,
  };
};
export const fetchCitasSearch = async (token, searchQuery) => {
  const res = await axios.get(
    `/admin/citas/search?searchQuery=${searchQuery || "none"}`,
    {
      headers: { Authorization: token },
    }
  );
  return res;
};

export const dispatchGetCitasSearch = (res) => {
  return {
    type: ACTIONS.SEARCH_CITA,
    payload: res.data,
  };
};
