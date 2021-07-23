import { ItemValorExameRequest } from "./ItemValorExame";

export interface ItemCampoExame {
    id: number;
    campo: string;
    idTipoExame: number;
}

export interface DadosTipoExameResponse {
    id: number;
    nomeExame: string;
    itensCampo: ItemCampoExame[];
}

export interface TipoExameResponse {
    id: number;
    nomeExame: string;
    quantidade: number;
}

export interface TipoExameRequest {
    id: number;
    nomeExame: string;
}