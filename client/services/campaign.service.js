import { BACKEND_ROOT_URL } from "../constants";
const API_URL = `${BACKEND_ROOT_URL}/campaign`;
import axios from "axios";

export const createCampaign = async (body) => {
  console.log(body);
  const res = await axios.post(API_URL + "/create", body);
  return res.data;
};

export const getAllCampaigns = async () => {
  const res = await axios.get(API_URL + "/get");
  return res.data;
};
