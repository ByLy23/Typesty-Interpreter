//aritmeticas
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
    izq = this.cond1.interpretar(arbol, tabla);
    if (izq instanceof Errores) return izq;
    der = this.cond2.interpretar(arbol, tabla);
    if (der instanceof Errores) return der;
    switch (this.relacion) {
      case Relacionales.IGUAL:
        console.log(izq);
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

export enum Relacionales {
  IGUAL,
  DIFERENTE,
  MAYOR,
  MENOR,
  MAYORIGUAL,
  MENORIGUAL,
}
