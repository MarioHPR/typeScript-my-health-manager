import axios from 'axios';

const api = axios.create({
    baseURL: 'https:/back-geranciador-exames.herokuapp.com/',
    headers: { 
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
      'Authorization': ' '
    }
})

export default api;

/*
import Axios from 'axios';

const URI = `http://localhost:8080/`;
const URI_HEROKU = 'https:/back-geranciador-exames.herokuapp.com/';

export default class UsuarioApi {

  // ###### USUARIO #####
  async buscarDadosDoUsuario(auth) {
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.get( `${URI_HEROKU}api/usuario/buscar-dados` );
    return response;
  }


  async criarUsuario( usuario ) {
    Axios.defaults.headers.Authorization = "";
    const response = await Axios.post( `${URI_HEROKU}api/usuario/salvar`, usuario );
    return response;
  }

  async editarUsuario( usuario, auth ) {
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.put( `${URI_HEROKU}api/usuario/editar`, usuario );
    return response;
  }

  async realizarLogin(email, senha) {
    //const response = await Axios.post(`${URI}login`,
    const response = await Axios.post(`${URI_HEROKU}login`,
      { email: email, senha: senha }
    );
    return response;
  }

}
*/