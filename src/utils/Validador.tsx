import moment from 'moment';


export const campoStringVazio = (campo: string): boolean => {
    return campo === "" || campo === undefined || campo === null;
}

export const requisitoNaoContemDominimoEmail = (campo: string): boolean => {
    return !campo.includes('@gmail.com');
}

export const requisitoSenhaNaoContemTamanhoMinimo = (campo: string): boolean => {
    return campo.length < 6;
}

export const localeDateToISO = (localeDate: string) => {
    return localeDate.split('/').reverse().join('-');
  };

export const dataValida = (campo: string): string => { 
    // const { t } = useTranslation();
    // if(campoStringVazio(campo)){
    //     return t("alertPadrao");
    // }
    // const date = moment(localeDateToISO(campo)); 
    // return date.isValid() ? "" : t("error.data");
    return "";
}

export const verificaEmailInvalido = (valor:string): string => {
    // const { t } = useTranslation();
    // if(campoStringVazio(valor)){
    //     return t("alertPadrao");
    // } else {
    //     if(requisitoNaoContemDominimoEmail(valor)){
    //         return t("email.error.alertaEmail");
    //     } else {
    //         return "";
    //     }
    // }       
    return "";
}

export const verificaSenhaInvalida = (valor:string): string => {
    // const { t } = useTranslation();
    // if(campoStringVazio(valor)) {
    //     return t("alertPadrao");
    // } else {
    //     if(requisitoSenhaNaoContemTamanhoMinimo(valor)) {
    //         return t("senha.error.alertMinimoCaracter");
    //     } else {
    //         return "";
    //     }
    // }
    return "";
}

export const verificaCampoVazio = (valor: string): string => {
    // const { t } = useTranslation();
    // return campoStringVazio(valor) ? t("alertPadrao") : "";
    return "";
}