import ACTIONS from "./index";
import axios from "axios";

export const fetchAllCitas = async (token) => {
  const res = await axios.get("admin/citas", {
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
