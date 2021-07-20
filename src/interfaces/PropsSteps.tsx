import { UsuarioRequest } from './Usuario';

export interface IpropStep {
    mudarStep: (value:number) => void;
    request: UsuarioRequest;
    handleSubmit?: () => void;
};