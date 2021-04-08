import { Instruccion } from "../Abastracto/Instruccion"
import Arbol from "../Simbolos/Arbol";
import tablaSimbolos from "../Simbolos/tablaSimbolos";



export default class Nativo extends Instruccion{
    valor: any;
    constructor(valor: any, fila: Number, columna: Number){
        super(valor,fila,columna);
        Object.assign(this,{valor});
    }

    interpretar(arbol:Arbol, tabla: tablaSimbolos){
        return this.valor;
    }
}