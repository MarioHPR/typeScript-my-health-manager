import { ContatoRequest, INITIAL_CONTATO_REQUEST } from "./Contato";
import { EnderecoRequest, INITIAL_ENDERECO_REQUEST } from "./Endereco";

export interface InstituicaoRequest {
    id: number;
    nome: string;
    contatoDTO: ContatoRequest;
    enderecoDTO: EnderecoRequest;
}

export interface InstituicaoResponse {
    id: number;
    nome: string;
    contatoDTO: ContatoRequest;
    enderecoDTO: EnderecoRequest;
}

export interface TableInstituicao {
    key: string;
    nome: string;
    cidade: string;
    contato: string;
}

export const INITIAL_INSTITUICAO_REQUEST: InstituicaoRequest = {
    id: 0,
    nome: "",
    contatoDTO: INITIAL_CONTATO_REQUEST,
    enderecoDTO: INITIAL_ENDERECO_REQUEST
}