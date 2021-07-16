import ACTIONS from "./index";
import axios from "axios";

export const fetchAllUsers = async (token) => {
  const res = await axios.get("/user/all_infor", {
    headers: { Authorization: token },
  });
  return res;
};

export const dispatchGetAllUsers = (res) => {
  return {
    type: ACTIONS.GET_ALL_USERS,
    payload: res.data,
  };
};
export const fetchUsersSearch = async (token, searchQuery) => {
  const res = await axios.get(
    `/user/search?searchQuery=${searchQuery || "none"}`,
    {
      headers: { Authorization: token },
    }
  );
  return res;
};

export const dispatchGetUsersSearch = (res) => {
  return {
    type: ACTIONS.SEARCH_USERS,
    payload: res.data,
  };
};
