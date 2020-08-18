import axios from "axios";
  const accessToken = "10dfce6480de0cbb787c8674f95575efdbe50b8798386b37e7f699c29dbde4b0"
  const baseURL = "https://gorest.co.in/public-api/"
  let headers = {};

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const http = axios.create({
    baseURL: baseURL,
    headers,
  });

  export default http;