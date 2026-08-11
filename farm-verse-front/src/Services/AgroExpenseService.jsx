import axios from "axios";

const AGROEXPENSE_URL = "http://localhost:9696/farmverse/exp";
const ID_URL = "http://localhost:9696/farmverse/exp-id";
const ENO_URL = "http://localhost:9696/farmverse/agroexpense-no";

export const addAgroExpense = (agroExpense) => {
  return axios.post(AGROEXPENSE_URL, agroExpense, {
    withCredentials: true,
  });
};

export const updateAgroExpense = (agroExpense) => {
  return axios.put(AGROEXPENSE_URL, agroExpense, {
    withCredentials: true,
  });
};

export const getAgroExpenseById = (id) => {
  return axios.get(`${AGROEXPENSE_URL}/${id}`, {
    withCredentials: true,
  });
};

export const getAllAgroExpenses = () => {
  return axios.get(AGROEXPENSE_URL, {
    withCredentials: true,
  });
};

export const deleteAgroExpenseById = (id) => {
  return axios.delete(`${AGROEXPENSE_URL}/${id}`, {
    withCredentials: true,
  });
};

export const generateExpenseId = () => {
  return axios.get(ID_URL, {
    withCredentials: true,
  });
};

export const getAllExpenseIds = () => {
  return axios.get(ENO_URL, {
    withCredentials: true,
  });
};