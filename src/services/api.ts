import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const baseURL = 'https:/back-geranciador-exames.herokuapp.com/';

export const ApiService: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
      'Accept-Language': 'pt, pt-BR',
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
        Authorization: token ? token : '',
      }
    }
    return config;
  }
);
