import { Instruccion } from "../../Abastracto/Instruccion";
import Errores from "../../Excepciones/Errores";
import Arbol from "../../Simbolos/Arbol";
import tablaSimbolos from "../../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../../Simbolos/Tipo";

export default class condIfTernario extends Instruccion {
  private condicion: Instruccion;
  private condIf: Instruccion;
  private condElse: Instruccion;
  constructor(
    cond: Instruccion,
    conIf: Instruccion,
    conElse: Instruccion,
    fila: Number,
    columna: Number
  ) {
    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.condicion = cond;
    this.condIf = conIf;
    this.condElse = conElse;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    let val = this.condicion.interpretar(arbol, tabla);
    if (val instanceof Errores) return val;
    return val
      ? this.condIf.interpretar(arbol, tabla)
      : this.condElse.interpretar(arbol, tabla);
  }
}
