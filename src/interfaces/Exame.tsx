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
    bairro: string;
    cep: string;
    cidade: string;
    contatoDoisInstituicao: string;
    contatoUmInstituicao: string;
    dataExame: string;
    idArquivo: number;
    idInstituicao: number;
    nomeInstituicao: string;
    numero: number;
    parametros: ItemValorExameRequest[];
    rua: string;
    nomeExame: string;
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