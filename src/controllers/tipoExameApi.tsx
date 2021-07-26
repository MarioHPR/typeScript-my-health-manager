import { ApiService } from '../services/api';
import { DadosTipoExameResponse, TipoExameResponse } from '../interfaces/TipoExame';
import { DadosExameRequest } from '../interfaces/Exame';

export const buscarTodosTipoExames = async () => {
  const response: TipoExameResponse[] = (await ApiService.get('api/tipoExame/buscar/todos')).data;
  return  response;
}

export const buscarTipoExame = async () => {
  const response: DadosTipoExameResponse[] = (await ApiService.get('api/tipoExame/buscar/')).data;
  return  response;
}

export const removerTipoExame = async (id: number) => {
  await ApiService.get(`api/tipoExame/deletar/${id}`);
}

export const editarTipoExame = async (id: number, tipoExame: string) => {
  await ApiService.put(`api/tipoExame/editar/${id}`, {"nomeExame": tipoExame});
}

export const criarTipoExame = async (request: DadosExameRequest) => {
  await ApiService.post(`api/tipoExame/salvar-resumo/`, request);
}