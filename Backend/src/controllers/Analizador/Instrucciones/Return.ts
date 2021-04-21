import { Instruccion } from '../Abastracto/Instruccion';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';

export default class Return extends Instruccion {
  private expresionReturn?: Instruccion;
  public valor = null;
  constructor(fila: Number, columna: Number, expresion?: Instruccion) {
    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.expresionReturn = expresion;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    if (this.expresionReturn) {
      this.valor = this.expresionReturn?.interpretar(arbol, tabla);
      this.tipoDato = this.expresionReturn.tipoDato;
    }
    return this;
  }
}
