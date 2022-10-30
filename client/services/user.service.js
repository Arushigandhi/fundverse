import { BACKEND_ROOT_URL } from "../constants";
const API_URL = `${BACKEND_ROOT_URL}/user`;
import axios from "axios";

export const createUser = async (body) => {
  const res = await axios.post(API_URL + "/create", body);
  return res.data;
};

export const getUser = async (uid) => {
  const response = await axios.get(API_URL + "/get/" + uid);
  return response.data;
};
