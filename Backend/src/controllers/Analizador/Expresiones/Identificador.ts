import { Instruccion } from '../Abastracto/Instruccion';
import nodoAST from '../Abastracto/nodoAST';
import Errores from '../Excepciones/Errores';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';

export default class Identificador extends Instruccion {
  public identificador: String;
  constructor(identificador: String, fila: number, columna: number) {
    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.identificador = identificador.toLowerCase();
  }
  public getNodo(): nodoAST {
    let nodo = new nodoAST('IDENTIFICADOR');
    nodo.agregarHijo(this.identificador + '');
    return nodo;
  }

  /*
  public getNodo():nodoAST{
    let nodo= new nodoAST("");
    return nodo;
  }
  */
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    let variable = tabla.getVariable(this.identificador);
    if (variable != null) {
      this.tipoDato = variable.gettipo();
      return variable.getvalor();
    } else {
      return new Errores(
        'SEMANTICO',
        'VARIABLE ' + this.identificador + ' NO EXISTE',
        this.fila,
        this.columna
      );
    }
  }
}
