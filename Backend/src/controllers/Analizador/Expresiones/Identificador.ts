import { Instruccion } from "../Abastracto/Instruccion";
import Errores from "../Excepciones/Errores";
import Arbol from "../Simbolos/Arbol";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";

export default class Identificador extends Instruccion {
  private identificador: String;
  constructor(identificador: String, fila: Number, columna: Number) {
    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.identificador = identificador;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    let variable = tabla.getVariable(this.identificador);
    if (variable != null) {
      return variable.getvalor();
    } else {
      return new Errores(
        "SEMANTICO",
        "VARIABLE " + this.identificador + " NO EXISTE",
        this.fila,
        this.columna
      );
    }
  }
}
