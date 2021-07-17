import { InstituicaoRequest } from "./Instituicao";
import { ItemValorExameRequest } from "./ItemValorExame";

export interface DadosExameRequest {
    nomeExame: string;
    idArquivo: number;
    dataExame: string;
    campo: string[];
    valor: string[];
    dadosInstituicao: InstituicaoRequest;
}

export interface DadosExameEditRequest {
    tipoExame: string;
    idArquivo: number;
    dataExame: string;
    dadosInstituicao: InstituicaoRequest;
    parametros: ItemValorExameRequest[];
}

export interface DadosExameResponse {
    id: number;
    nomeExame: string;
    idArquivo: number;
    dataExame: string;
    dadosInstituicao: InstituicaoRequest;
    parametros: ItemValorExameRequest[];
    flgDeleted: boolean;
}