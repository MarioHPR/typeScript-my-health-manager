import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
require("dotenv").config();

export const ApiService: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
      'Accept-Language': 'pt, pt-BR',
      "Authorization": ' '
  }
});

const getToken = (): string | null => {
  return window.localStorage.getItem('token-gerenciador-security');
}

ApiService.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Interceptor de autenticação
    const token = getToken();
    if (token && config.url) {
      config.headers = {
        ...config.headers,
        Authorization: token ? token : " ",
      }
    }
    return config;
  }
);
