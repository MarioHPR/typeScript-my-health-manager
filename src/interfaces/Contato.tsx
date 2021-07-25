export interface ContatoRequest {
    id: number;
    contatoUm: string;
    contatoDois: string;
    flgContatoUsuario: false;
}

export const INITIAL_CONTATO_REQUEST: ContatoRequest = {
    id: 0,
    contatoUm: "",
    contatoDois: "",
    flgContatoUsuario: false
}