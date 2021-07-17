import { InstituicaoRequest } from "./Instituicao";

export interface ConsultaRequest {
    nomeMedico: string;
    dataConsulta: string;
    diagnostico: string;
    prescricao: string;
    idArquivo: number;
    dadosInstituicao: InstituicaoRequest;
}

export interface ConsultaResponse {
    nomeMedico: string;
    dataConsulta: string;
    diagnostico: string;
    prescricao: string;
    idArquivo: number;
    dadosInstituicao: InstituicaoRequest;
}