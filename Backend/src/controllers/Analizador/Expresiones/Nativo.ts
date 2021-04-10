import { Instruccion } from "../Abastracto/Instruccion";
import Errores from "../Excepciones/Errores";
import Arbol from "../Simbolos/Arbol";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo from "../Simbolos/Tipo";

export default class Nativo extends Instruccion {
  valor: any;
  constructor(tipo: Tipo, valor: any, fila: Number, columna: Number) {
    super(tipo, fila, columna);
    this.valor = valor;
  }

  interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    return this.valor;
  }
}
