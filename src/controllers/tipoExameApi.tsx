import { ApiService } from '../services/api';
import { TipoExameResponse } from '../interfaces/TipoExame';

export const buscarTodosTipoExames = async () => {
  const response: TipoExameResponse[] = (await ApiService.get('api/tipoExame/buscar/todos')).data;
  return  response;
}

export const removerTipoExame = async (id: number) => {
  await ApiService.get(`api/tipoExame/deletar/${id}`);
}

export const editarTipoExame = async (id: number, tipoExame: string) => {
await ApiService.put(`api/tipoExame/editar/${id}`, {"nomeExame": tipoExame});
}