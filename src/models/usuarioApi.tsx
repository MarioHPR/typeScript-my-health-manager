import { ParametrosLogin, UsuarioRequest, UsuarioResponse } from '../interfaces/Usuario';
import {ApiService}  from '../services/api';


export const buscarDadosDoUsuario = async () => {
  const response: UsuarioResponse = (await ApiService.get( `api/usuario/buscar-dados` )).data;
  return  response;
}

export const criarUsuario = async (usuario: UsuarioRequest) => {
  const response = await ApiService.post( `api/usuario/salvar`, JSON.stringify(usuario) );
  return  response;
}

export const editarUsuario = async ( usuario: UsuarioRequest ) => {
  const response: UsuarioResponse = await ApiService.put( `api/usuario/editar`, JSON.stringify(usuario) );
  return  response;
}

export const realizarLogin = async ( parametros: ParametrosLogin ) => {
  const response = await ApiService.post( `login`, JSON.stringify(parametros) );
  return  response;
}