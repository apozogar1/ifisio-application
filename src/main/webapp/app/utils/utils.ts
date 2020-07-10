export default class Utils {
    public static formatName = (nombre: string | undefined, apellidos: string | undefined): string => {
        return nombre?.substr(0, 1) + '. ' + apellidos;
    }
}