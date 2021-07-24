
import { ApiService } from '../services/api';
import { ConsultaRequest, ConsultaResponse } from '../interfaces/Consulta';

export const buscarConsultas = async () => {
  const response: ConsultaResponse[] = (await ApiService.get(`api/consulta/buscar/consultas`)).data;
  return response;
}

export const buscarConsultaPorId = async (id:number) => {
  const response: ConsultaResponse = (await ApiService.get(`api/consulta/buscar/consulta/${id}`)).data;
  return response;
}

export const criarConsulta = async (request:ConsultaRequest) => {
  await ApiService.post(`api/consulta/salvar/`, JSON.stringify(request));
}

export const removerConsulta = async (id:number) => {
  await ApiService.delete(`api/consulta/deletar/${id}`);
}

export const editarConsulta = async (id:number, consulta:ConsultaRequest) => {
  await ApiService.put(`api/consulta/editar/${id}`, JSON.stringify(consulta));
}
