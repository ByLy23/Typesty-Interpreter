import { Instruccion } from "../../Abastracto/Instruccion";
import Errores from "../../Excepciones/Errores";
import Arbol from "../../Simbolos/Arbol";
import tablaSimbolos from "../../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../../Simbolos/Tipo";

export default class condIf extends Instruccion {
  private cond1: Instruccion;
  private condIf: Instruccion[];
  private cond2?: boolean;
  private condElse?: Instruccion[];
  constructor(
    fila: Number,
    columna: Number,
    cond1: Instruccion,
    condIf: Instruccion[],
    cond2?: boolean,
    condElse?: Instruccion[]
  ) {
    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.cond1 = cond1;
    this.condIf = condIf;
    this.cond2 = cond2;
    this.condElse = condElse;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    let val = this.cond1.interpretar(arbol, tabla);
    if (!this.cond2) {
      if (val == true) {
        this.condIf.forEach((valor) => {
          let a = valor.interpretar(arbol, tabla);
          if (a instanceof Errores) return a;
        });
      }
    } else {
      if (val == true) {
        this.condIf.forEach((valor) => {
          let a = valor.interpretar(arbol, tabla);
          if (a instanceof Errores) return a;
        });
      } else {
        this.condElse?.forEach((valor) => {
          let a = valor.interpretar(arbol, tabla);
          if (a instanceof Errores) return a;
        });
      }
    }
  }
}
