import { table } from "node:console";
import { Instruccion } from "../Abastracto/Instruccion";
import Errores from "../Excepciones/Errores";
import Arbol from "../Simbolos/Arbol";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";




export default class Aritmetica extends Instruccion{
    private operando1:Instruccion|undefined;
    private operando2:Instruccion|undefined;
    private operandoUnico:Instruccion|undefined;
    private operador:Operadores;

    constructor(operador:Operadores, fila:Number, columna:Number,op1:Instruccion,op2?:Instruccion){
        super(new Tipo(tipoDato.ENTERO),fila,columna);
        this.operador=operador;
        if(!op2)
            this.operandoUnico=this.operando1;
        else{
            this.operando1=op1;
            this.operando2=op2;
        }
    }
    public interpretar(arbol:Arbol,tabla:tablaSimbolos){
        let izq,der,uno;
        izq=der=uno=null;
        if(this.operandoUnico!=null){
            uno=this.operandoUnico.interpretar(arbol,tabla);
            if(uno instanceof Errores) return uno;
        }else{
            izq=this.operando1?.interpretar(arbol,tabla);
            if(izq instanceof Errores) return izq;
            der=this.operando2?.interpretar(arbol,tabla);
            if(der instanceof Errores) return der;
        }
    }
}
export enum Operadores{
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    POTENCIA,
    MODULADOR,
    MENOSNUM
}