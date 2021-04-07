import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Tipo from '../Simbolos/Tipo';


export abstract class Instruccion{
    public tipoDato:Tipo;
    public fila: Number;
    public columna: Number;
    constructor(tipo:Tipo,
        fila:Number,
        columna:Number){
            this.tipoDato=tipo;
            this.fila=fila;
            this.columna=columna;
        }
        
    abstract interpretar(arbol:Arbol, tabla: tablaSimbolos):any;
}