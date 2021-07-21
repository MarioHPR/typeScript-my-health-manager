import { AlergiaRestricao } from "./AlergiaRestricao";
import { ParametrosLogin, Step1, UsuarioRequest } from "./Usuario";

export interface AuthContextData {
    signIn(userLogin: ParametrosLogin): Promise<void>;
    signOut(): void;
    cadastrarUsuario(request:UsuarioRequest): Promise<void>;
    user: string | null;
}

export interface AuthRestricoes {
    listaInfos: AlergiaRestricao[];
    listarRestricoes(): Promise<void>;
}

export interface AuthContextUsuario {
    step1(parametros:Step1): Promise<void>;
}

export interface ButtonProps {
    nomeBotao: string;
    acao: any;
    style: any;
    icon: any;
    type: any;
}
export interface ErrorAPI {
    code: string;
    details: ErrorAPI[];
    error: string;
    message: string;
}