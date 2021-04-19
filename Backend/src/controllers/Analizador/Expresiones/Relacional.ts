//aritmeticas
import { Console } from "node:console";
import { Instruccion } from "../Abastracto/Instruccion";
import Errores from "../Excepciones/Errores";
import Arbol from "../Simbolos/Arbol";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";

export default class Relacional extends Instruccion {
  private cond1: Instruccion;
  private cond2: Instruccion;
  private relacion: Relacionales;
  constructor(
    relacion: Relacionales,
    fila: Number,
    columna: Number,
    cond1: Instruccion,
    cond2: Instruccion
  ) {
    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.relacion = relacion;
    this.cond1 = cond1;
    this.cond2 = cond2;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    let izq, der;
    izq = this.obtieneValor(this.cond1, arbol, tabla);
    if (izq instanceof Errores) return izq;
    der = this.obtieneValor(this.cond2, arbol, tabla);
    if (der instanceof Errores) return der;
    if (
      this.cond1.tipoDato.getTipo() == tipoDato.CADENA &&
      this.cond2.tipoDato.getTipo() != tipoDato.CADENA
    ) {
      return new Errores(
        "ERROR SEMANTICO",
        "NO SE PUEDE COMPARAR UNA CADENA CON OTRO TIPO DE DATO QUE NO SEA CADENA",
        this.fila,
        this.columna
      );
    } else if (
      this.cond2.tipoDato.getTipo() == tipoDato.CADENA &&
      this.cond1.tipoDato.getTipo() != tipoDato.CADENA
    ) {
      return new Errores(
        "ERROR SEMANTICO",
        "NO SE PUEDE COMPARAR UNA CADENA CON OTRO TIPO DE DATO QUE NO SEA CADENA",
        this.fila,
        this.columna
      );
    } else {
      switch (this.relacion) {
        case Relacionales.IGUAL:
          return izq == der;
        case Relacionales.DIFERENTE:
          return izq != der;
        case Relacionales.MENOR:
          return izq < der;
        case Relacionales.MENORIGUAL:
          return izq <= der;
        case Relacionales.MAYOR:
          return izq > der;
        case Relacionales.MAYORIGUAL:
          return izq >= der;
        default:
          return "what";
      }
    }
  }
  obtieneValor(operando: Instruccion, arbol: Arbol, tabla: tablaSimbolos): any {
    let valor = operando.interpretar(arbol, tabla);
    switch (operando.tipoDato.getTipo()) {
      case tipoDato.ENTERO:
        return parseInt(valor);
      case tipoDato.DECIMAL:
        return parseFloat(valor);
      case tipoDato.CARACTER:
        var da = valor + "";
        var res = da.charCodeAt(0);
        return res;
      case tipoDato.BOOLEANO:
        let dats = valor + "";
        let otr = dats.toLowerCase();
        return parseInt(otr);
      case tipoDato.CADENA:
        return "" + valor;
    }
  }
}

export enum Relacionales {
  IGUAL,
  DIFERENTE,
  MAYOR,
  MENOR,
  MAYORIGUAL,
  MENORIGUAL,
}
