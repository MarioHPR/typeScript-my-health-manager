import Axios from 'axios';

const URI = `http://localhost:8080/`;
const URI_HEROKU = 'https:/back-geranciador-exames.herokuapp.com/';

export default class UsuarioApi {

  // ###### USUARIO #####
  async buscarDadosDoUsuario(auth:any) {
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.get( `${URI_HEROKU}api/usuario/buscar-dados` );
    return response;
  }


  async criarUsuario( usuario:any ) {
    Axios.defaults.headers.Authorization = "";
    const response = await Axios.post( `${URI_HEROKU}api/usuario/salvar`, usuario );
    return response;
  }

  async editarUsuario( usuario:any, auth:any ) {
    Axios.defaults.headers.Authorization = auth;
    const response = await Axios.put( `${URI_HEROKU}api/usuario/editar`, usuario );
    return response;
  }

  async realizarLogin(email:any, senha:any) {
    //const response = await Axios.post(`${URI}login`,
    const response = await Axios.post(`${URI_HEROKU}login`,
      { email: email, senha: senha }
    );
    return response;
  }

}