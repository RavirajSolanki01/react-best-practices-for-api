import axios from "axios";

const _baseUrl: string = process.env.REACT_APP_API_ROOT_URL ?? "";

const request = axios.create({
  baseURL: `${_baseUrl}`,
  responseType: "json",
});

export default request;
