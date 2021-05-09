import { Instruccion } from '../Abastracto/Instruccion';
import nodoAST from '../Abastracto/nodoAST';
import Errores from '../Excepciones/Errores';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';

export default class Print extends Instruccion {
  private expresion: Instruccion;
  constructor(expresion: Instruccion, fila: number, columna: number) {
    super(new Tipo(tipoDato.CADENA), fila, columna);
    this.expresion = expresion;
  }

  public getNodo(): nodoAST {
    let nodo = new nodoAST('IMPRESION');
    nodo.agregarHijo('print');
    nodo.agregarHijo('(');
    nodo.agregarHijoAST(this.expresion.getNodo());
    nodo.agregarHijo(')');
    nodo.agregarHijo(';');
    return nodo;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    let valor = this.expresion.interpretar(arbol, tabla);
    if (valor instanceof Errores) return valor;
    arbol.actualizaConsola(valor + '');
  }
}
