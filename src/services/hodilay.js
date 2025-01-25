import axios from "axios";
const API_URL = import.meta.env.VITE_URL_API;

// endpoint : /holidays?country=US&year=2021

export const getHoliday = async (country, year) => {
  try {
    const reponse = await axios.get(
      `${API_URL}holidays?country=${country}&year=${year}`
    );
    const data = await reponse.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};
