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