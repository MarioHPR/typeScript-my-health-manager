import { ContatoRequest } from "./Contato";
import { EnderecoRequest } from "./Endereco";

export interface InstituicaoRequest {
    id: number;
    nome: string;
    contato: ContatoRequest;
    endereco: EnderecoRequest;
}

export interface InstituicaoResponse {
    id: number;
    nome: string;
    contato: ContatoRequest;
    endereco: EnderecoRequest;
}