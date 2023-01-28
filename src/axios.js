import axios from "axios";

const $host = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

const $authHost = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

$host.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${window.localStorage.getItem("token")}`;
  return config;
});

export { $host, $authHost };
