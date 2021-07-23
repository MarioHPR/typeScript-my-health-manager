import { InstituicaoRequest, InstituicaoResponse } from '../interfaces/Instituicao';
import { ApiService } from '../services/api';

export const criarInstituicao = async (instituicao: InstituicaoRequest) => {
  await ApiService.post(`api/instituicao/salvar/`, JSON.stringify(instituicao));
}

export const buscarInstituicoes = async () => {
  const response: InstituicaoResponse[] = (await ApiService.get('api/instituicao/buscar/instituicoes')).data;
  return  response;
}

export const buscarInstituicaoPorId = async (id:number) => {
  const response: InstituicaoResponse = (await ApiService.get(`api/instituicao/buscar/${id}`)).data;
  return  response;
}

export const deletarInstituicao = async (id:number) => {
  await ApiService.delete(`api/instituicao/deletar/${id}`);
}

export const editarInstituicao = async (id:number, instituicao:InstituicaoRequest) => {
  await ApiService.put(`api/instituicao/editar/${id}`, instituicao);
}