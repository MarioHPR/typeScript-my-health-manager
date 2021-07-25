export interface EnderecoRequest {
    id: number;
    cidade: string;
    cep: string;
    bairro: string;
    rua: string;
    numero: number;
    flgEnderecoDoUsuario: false;
}

export const INITIAL_ENDERECO_REQUEST: EnderecoRequest = {
    id: 0,
    cidade: "",
    cep: "",
    bairro: "",
    rua: "",
    numero: 0,
    flgEnderecoDoUsuario: false
}