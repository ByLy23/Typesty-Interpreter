//relacionales

import { Instruccion } from "../Abastracto/Instruccion";
import Errores from "../Excepciones/Errores";
import Arbol from "../Simbolos/Arbol";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";

export default class Logica extends Instruccion {
  private cond1: Instruccion | undefined;
  private cond2: Instruccion | undefined;
  private condExcep: Instruccion | undefined;
  private loogica: Logicas;
  constructor(
    relacion: Logicas,
    fila: Number,
    columna: Number,
    cond1: Instruccion,
    cond2?: Instruccion
  ) {
    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.loogica = relacion;
    if (!cond2) this.condExcep = cond1;
    else {
      this.cond1 = cond1;
      this.cond2 = cond2;
    }

    console.log(this.cond1 + "");
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    let izq, der, unico;
    izq = der = unico = null;
    if (this.condExcep != null) {
      unico = this.condExcep.interpretar(arbol, tabla);
      if (unico instanceof Errores) return unico;
    } else {
      izq = this.cond1?.interpretar(arbol, tabla);
      if (izq instanceof Errores) return izq;
      der = this.cond2?.interpretar(arbol, tabla);
      if (der instanceof Errores) return der;
    }
    //inicio comparacion
    switch (this.loogica) {
      case Logicas.AND:
        console.log(izq + " " + der);
        return izq && der ? true : false;
      case Logicas.OR:
        return izq || der ? true : false;
      case Logicas.NOT:
        return !unico;
    }
  }
}

export enum Logicas {
  OR,
  AND,
  NOT,
}
