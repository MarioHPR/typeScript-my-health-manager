export interface UsuarioRequest {
    nome?: string,
    cpf?: string,
    dataNascimento?: string,
    email?: string,
    senha?: string,
    contatoUm?: string,
    contatoDois?: string,
    cidade?: string,
    cep?: string,
    bairro?: string,
    rua?: string,
    numero?: number
}

export const INITIAL_REQUEST: UsuarioRequest = {
    nome: "",
    dataNascimento: "",
    cpf: "",
    email: "",
    senha: "",
    contatoUm: "",
    contatoDois: "",
    cidade: "",
    cep: "",
    bairro: "",
    rua: "",
    numero: 0
}

export interface Step1 {
    nome: string,
    cpf: string,
    dataNascimento: string,
    email: string,
    senha: string
}
export interface UsuarioResponse {
    nome: string;
    cpf: string;
    dataNascimento: string;
    email: string;
    senha: string;
    contatoUm: string;
    contatoDois: string;
    cidade: string;
    cep: string;
    bairro: string;
    rua: string;
    numero: number;
}

export interface ParametrosLogin {
    email: string;
    senha: string;
}