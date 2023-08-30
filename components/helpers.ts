import axios from "axios";

export const fetchFromAPI = async (text: string) => {
  try {
    const response = await axios.get(`api/myapi?q=${text}&hello=1`);
    return response.data.items;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
