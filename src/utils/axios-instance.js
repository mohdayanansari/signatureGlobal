import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.notbot.in/",
  timeout: 15000,
  withCredentials: false,
  // headers: {
  //   "Content-Type": "application/json",
  //   "Authorization":
  //     "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY1ODA1OTUzOSwianRpIjoiOWZhMzIyMWItYTEzZC00ZTBiLWIzNDgtOWNkMTU0ZmJkNGExIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImF5YWFuQG5vdGJvdC5pbiIsIm5iZiI6MTY1ODA1OTUzOX0.RRmRL1c46AmLSzTIMDgsS4EYq8ouVOIILXgCRS3lqDo",
  // },
});

export const downloadCSVFileInstance = axios.create({
  baseURL: "https://api.notbot.in/",
  timeout: 15000,
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
