import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { AlergiaRestricao } from '../interfaces/AlergiaRestricao';

const baseURL = 'https:/back-geranciador-exames.herokuapp.com/';

const ApiService: AxiosInstance = axios.create({
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
          Authorization: token,
        }
      }
      return config;
    }
  );

export const listar = async () => {
    const response: AlergiaRestricao[] = (await ApiService.get('api/restricoes/')).data;
    return  response;
}

// export default class AlergiaRestricaoApi {

//     headerRequest = (token: string) => {
//         return axios.create({
//             baseURL: baseURL,
//             headers: { 
//                 'Content-Type': 'application/json;charset=UTF-8',
//                 "Access-Control-Allow-Origin": "*",
//                 'Authorization': token
//             }
//         }) 
//     }

//     listar( token: string ) {  
//         const alergiaRestricaoApi = this.headerRequest(token);
//         const response = alergiaRestricaoApi.get('api/restricoes/');
//         return response;
//     }

//     addNovo( request: AlergiaRestricaoRequest, token: string ) {
//         const alergiaRestricaoApi = this.headerRequest(token);
//         const response = alergiaRestricaoApi.post('api/restricoes/salvar', JSON.stringify(request) );
//         return response;
//     }
    
//     editar( id: string,  request: AlergiaRestricaoRequest, token: string ) {
//         const alergiaRestricaoApi = this.headerRequest(token);
//         const response = alergiaRestricaoApi.put( `api/restricoes/editar/${id}`, request );
//         return response;
//     }
    
//     excluir( id: string, token: string ) {
//         console.log("excluir api id ", id)
//         const alergiaRestricaoApi = this.headerRequest(token);
//         const response = alergiaRestricaoApi.delete(`api/restricoes/deletar/${id}`);
//         return response;
//     }
// };