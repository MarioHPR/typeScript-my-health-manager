import axios from 'axios';
import { AlergiaRestricaoRequest } from '../interfaces/AlergiaRestricao';

const baseURL = 'https:/back-geranciador-exames.herokuapp.com/';

export default class AlergiaRestricaoApi {

    headerRequest = (token: string) => {
        return axios.create({
            baseURL: baseURL,
            headers: { 
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                'Authorization': token
            }
        }) 
    }

    listar( token: string ) {  
        const alergiaRestricaoApi = this.headerRequest(token);
        const response = alergiaRestricaoApi.get('api/restricoes/');
        return response;
    }

    addNovo( request: AlergiaRestricaoRequest, token: string ) {
        const alergiaRestricaoApi = this.headerRequest(token);
        const response = alergiaRestricaoApi.post('api/restricoes/salvar', JSON.stringify(request) );
        return response;
    }
    
    editar( id: string,  request: AlergiaRestricaoRequest, token: string ) {
        const alergiaRestricaoApi = this.headerRequest(token);
        const response = alergiaRestricaoApi.put( `api/restricoes/editar/${id}`, request );
        return response;
    }
    
    excluir( id: string, token: string ) {
        console.log("excluir api id ", id)
        const alergiaRestricaoApi = this.headerRequest(token);
        const response = alergiaRestricaoApi.delete(`api/restricoes/deletar/${id}`);
        return response;
    }
};