import { Instruccion } from '../../Abastracto/Instruccion';
import nodoAST from '../../Abastracto/nodoAST';
import Errores from '../../Excepciones/Errores';
import Arbol from '../../Simbolos/Arbol';
import tablaSimbolos from '../../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../../Simbolos/Tipo';

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
  public getNodo(): nodoAST {
    let nodo = new nodoAST('TERNARIO');
    nodo.agregarHijoAST(this.condicion.getNodo());
    nodo.agregarHijo('?');
    nodo.agregarHijoAST(this.condIf.getNodo());
    nodo.agregarHijo(':');
    nodo.agregarHijoAST(this.condElse.getNodo());
    return nodo;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    let val = this.condicion.interpretar(arbol, tabla);
    if (val instanceof Errores) return val;
    return val
      ? this.condIf.interpretar(arbol, tabla)
      : this.condElse.interpretar(arbol, tabla);
  }
}
