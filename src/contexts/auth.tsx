import React, { createContext, useState, ReactNode } from 'react';
import api from '../services/api';

import { AuthContextData } from '../interfaces/ParametrosRequestTypes';
import { ParametrosLogin } from '../interfaces/Usuario';
import { useHistory } from 'react-router-dom';
import { useCallback } from 'react';
import {toast} from "react-toastify";
import { useTranslation  } from 'react-i18next';

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

    const notify = () => {
        toast.error(t('errors.login'));
    }

    const signIn = useCallback(async (parametros: ParametrosLogin) => {
        try {
            const response = await api.post('/login', parametros);
            localStorage.setItem("token-gerenciador-security", response.headers.authorization);
            setUser(response.headers.authorization)
            history.push("/");
        } catch (error) {        
            notify();
        }
    }, [history]);

    const signOut = useCallback(() => {
        localStorage.removeItem('token-gerenciador-security');
        setUser(null);
    }, []);


    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};