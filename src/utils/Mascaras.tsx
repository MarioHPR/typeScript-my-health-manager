export const mascaraCep = (valor: string): string => {
    valor = valor.replace(/\D/g, "");
    return valor.replace(/^(\d{5})(\d)/, "$1 - $2");
}

export const mascaraCpf = (valor: string): string => {
    valor = valor.replace(/\D/g, "");
    return valor.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export const mascaraData = (valor: string): string => {
    valor = valor.replace(/\D/g, "");
    return valor.replace(/^(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
}

export const mascaraNumeroTelefone = (valor: string): string => {
    valor = valor.replace(/\D/g, "");
    return valor.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3 - $4");
}