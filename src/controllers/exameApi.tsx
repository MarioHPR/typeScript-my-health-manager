import { ApiService } from '../services/api';
import { DadosExameEditRequest, DadosExameResponse } from '../interfaces/Exame';

export const buscarTodosExames = async () => {
  const response: DadosExameResponse[] = (await ApiService.get(`api/exame/buscar-todos/`)).data;
  return response;
}

export const buscarExamePorId = async (id:number) => {
  const response: DadosExameResponse = (await ApiService.get(`api/exame/buscar-todos/${id}`)).data;
  return response;
}

export const editarExame = async (id:number, request:DadosExameEditRequest) => {
  const response: DadosExameResponse = (await ApiService.put(`api/exame/editar/${id}`, request)).data;
  return response;
}

export const removerExame = async (id:number) => {
  const response: string = (await ApiService.delete(`api/exame/deletar/${id}`)).data;
  return response;
}