import { Instruccion } from "../Abastracto/Instruccion";
import Arbol from "../Simbolos/Arbol";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";


export default class Print extends Instruccion{
    private expresion: Instruccion;
    constructor(expresion:Instruccion,
        fila: Number,
        columna: Number){
            super(new Tipo(tipoDato.CADENA), fila, columna);
            this.expresion=expresion;
        }
        public interpretar(arbol: Arbol, tabla: tablaSimbolos){
            let valor= this.expresion.interpretar(arbol, tabla);
            arbol.actualizaConsola(valor+"");
        }
}