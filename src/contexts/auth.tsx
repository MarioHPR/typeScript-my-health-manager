import React, { createContext, useState, ReactNode } from 'react';

import { AuthContextData } from '../interfaces/ParametrosRequestTypes';
import { ParametrosLogin, UsuarioRequest } from '../interfaces/Usuario';
import { useHistory } from 'react-router-dom';
import { useCallback } from 'react';
import {toast} from "react-toastify";
import { useTranslation  } from 'react-i18next';
import { criarUsuario, realizarLogin } from '../controllers/usuarioApi';

export const AuthContext = createContext<AuthContextData>({} as AuthContextData,);

export const AuthConsumer: React.FC<{ children: (data: AuthContextData) => ReactNode }> = ({ children }) => {
    return(
        <AuthContext.Consumer>
            {children}
        </AuthContext.Consumer>
    )
}

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<string | null>(localStorage.getItem("token-gerenciador-security"));
    const history = useHistory();
    const { t } = useTranslation();

    const notify = useCallback(() => {
        toast.error(t('errors.login'));
    },[t])

    const notifySucess = useCallback(() => {
        toast.success(t('Cadastrado com sucesso!'));
    },[t])

    const signIn = useCallback(async (parametros: ParametrosLogin) => {
        try {
            const response = await realizarLogin(parametros);
            localStorage.setItem("token-gerenciador-security", response.headers.authorization);
            setUser(response.headers.authorization)
            history.push("/");
        } catch (error) {     
            notify();
        }
    }, [history, notify]);

    const signOut = useCallback(() => {
        localStorage.removeItem('token-gerenciador-security');
        setUser(null);
        history.push("/login");
    }, [history]);

    const cadastrarUsuario = useCallback(async (request:UsuarioRequest) => {
        try {
            await criarUsuario(request);
            notifySucess();
            setTimeout(() => {
                history.push("/login");
            },3000);
        } catch (error) {        
            notify();
        }
     },[history, notify, notifySucess]);


    return (
        <AuthContext.Provider value={{ user, signIn, signOut, cadastrarUsuario }}>
            {children}
        </AuthContext.Provider>
    );
};