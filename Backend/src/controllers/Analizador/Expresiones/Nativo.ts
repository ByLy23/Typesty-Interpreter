import { Instruccion } from "../Abastracto/Instruccion";
import Errores from "../Excepciones/Errores";
import Arbol from "../Simbolos/Arbol";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";

export default class Nativo extends Instruccion {
  valor: any;
  constructor(tipo: Tipo, valor: any, fila: Number, columna: Number) {
    super(tipo, fila, columna);
    this.valor = valor;
  }

  interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    if (this.tipoDato.getTipo() == tipoDato.BOOLEANO) {
      return this.valor == "true" ? true : false;
    }
    return this.valor;
  }
}
