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

export const getSpecCampaign = async (uid) => {
  const response = await axios.get(API_URL + "/get/" + uid);
  return response.data;
};

export const createDonation = async (body) => {
  const response = await axios.post(API_URL + "/create-donation", body);
  return response.data;
};

export const getAllDonations = async (uid) => {
  const res = await axios.get(API_URL + "/get-all-donations/" + uid);
  return res.data;
};

export const addComment = async (body) => {
  const res = await axios.post(API_URL + "/add-comment", body);
  return res.data;
};

export const getAllComments = async (uid) => {
  const res = await axios.get(API_URL + "/get-all-comments/" + uid);
  return res.data;
};

export const getAllCategories = async () => {
  const res = await axios.get(API_URL + "/get-all-categories");
  return res.data;
};

export const getRemainingAmount = async (uid) => {
  const res = await axios.get(API_URL + "/get-remaining/" + uid);
  return res.data;
};
