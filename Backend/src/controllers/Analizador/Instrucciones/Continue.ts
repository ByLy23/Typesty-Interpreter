import { Instruccion } from "../Abastracto/Instruccion";
import Arbol from "../Simbolos/Arbol";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";

export default class Continue extends Instruccion {
  constructor(fila: Number, columna: Number) {
    super(new Tipo(tipoDato.ENTERO), fila, columna);
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    return "ByLyContinue";
  }
}
