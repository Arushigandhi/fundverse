import { BACKEND_ROOT_URL } from "../constants";
const API_URL = `${BACKEND_ROOT_URL}/user`;
import axios from "axios";

export const createUser = async (body) => {
  const response = await axios.post(API_URL + "/create", body);
  return response.data;
};

export const getUser = async (uid) => {
  const response = await axios.get(API_URL + "/get/" + uid);
  return response.data;
};

export const updateUser = async (data) => {
  const uid = data.uid;
  const body = {
    name: data.name,
    image: data.image,
    description: data.description,
  };
  const response = await axios.post(API_URL + "/update/" + uid, body);
  return response.data;
};
