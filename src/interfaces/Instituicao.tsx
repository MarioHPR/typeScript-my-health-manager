import { ContatoRequest } from "./Contato";
import { EnderecoRequest } from "./Endereco";

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