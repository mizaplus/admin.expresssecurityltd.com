import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://t871he04gb.execute-api.eu-west-1.amazonaws.com/prod",
});

export default axiosInstance;
