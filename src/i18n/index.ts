import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import PTBR from "./pt/pt-br.json";

const resources = {
    "pt": PTBR,
    "en-US": PTBR
}
console.log("navegador ", navigator.language)
console.log("resources ",resources)
i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: navigator.language,
        interpolation: {
            escapeValue: false
        }
    });
export default i18n;