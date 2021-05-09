import { Instruccion } from '../Abastracto/Instruccion';
import nodoAST from '../Abastracto/nodoAST';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';

export default class Nativo extends Instruccion {
  valor: any;
  constructor(tipo: Tipo, valor: any, fila: number, columna: number) {
    super(tipo, fila, columna);
    this.valor = valor;
    if (tipo.getTipo() == tipoDato.CADENA) {
      let val = this.valor.toString();
      this.valor = val
        .replace('\\n', '\n')
        .replace('\\t', '\t')
        .replace('\\r', '\r')
        .replace('\\\\', '\\')
        .replace("\\'", "'")
        .replace('\\"', '"');
    }
  }

  public getNodo(): nodoAST {
    let nodo = new nodoAST('NATIVO');
    nodo.agregarHijo(this.valor + '');
    return nodo;
  }
  interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    if (this.tipoDato.getTipo() == tipoDato.BOOLEANO) {
      return this.valor == 'true' ? true : false;
    }
    return this.valor;
  }
}
