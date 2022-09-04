import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.notbot.in/",
  timeout: 30000,
  withCredentials: false,
});

export const downloadCSVFileInstance = axios.create({
  baseURL: "https://api.notbot.in/",
  timeout: 30000,
  withCredentials: false,
  responseType: "blob",
});

export default function setAuthorizationToken(token) {
  if (token) {
    console.log("Revoke Auth::::::::::", token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    downloadCSVFileInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
    return true;
  } else {
    delete axios.defaults.headers.common["Authorization"];
    return false;
  }
}
