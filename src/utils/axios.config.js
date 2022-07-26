import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://kl9yk8nr4h.execute-api.eu-west-1.amazonaws.com/prod",
});

export default axiosInstance;
