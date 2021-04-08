import { Instruccion } from "../Abastracto/Instruccion"
import Errores from "../Excepciones/Errores";
import Arbol from "../Simbolos/Arbol";
import tablaSimbolos from "../Simbolos/tablaSimbolos";



export default class Nativo extends Instruccion{
    valor: any;
    constructor(valor: any, fila: Number, columna: Number){
        super(valor,fila,columna);
        Object.assign(this,{valor});
    }

    interpretar(arbol:Arbol, tabla: tablaSimbolos){
        if(this.valor instanceof Errores) return this.valor;
        return this.valor;
    }
}