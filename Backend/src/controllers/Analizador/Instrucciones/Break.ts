import { Instruccion } from '../Abastracto/Instruccion';
import nodoAST from '../Abastracto/nodoAST';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';

export default class Break extends Instruccion {
  constructor(fila: Number, columna: Number) {
    super(new Tipo(tipoDato.ENTERO), fila, columna);
  }
  public getNodo(): nodoAST {
    let nodo = new nodoAST('BREAK');
    nodo.agregarHijo('break');
    nodo.agregarHijo(';');
    return nodo;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    return 'ByLy23';
  }
}
