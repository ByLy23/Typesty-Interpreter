import { Instruccion } from '../Abastracto/Instruccion';
import nodoAST from '../Abastracto/nodoAST';
import Errores from '../Excepciones/Errores';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';

export default class Asignacion extends Instruccion {
  private identificador: string;
  private valor: Instruccion;
  constructor(
    identificador: string,
    valor: Instruccion,
    fila: Number,
    columna: Number
  ) {
    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.identificador = identificador;
    this.valor = valor;
  }
  public getNodo(): nodoAST {
    let nodo = new nodoAST('ASIGNACION');
    nodo.agregarHijo(this.identificador);
    nodo.agregarHijo('=');
    nodo.agregarHijoAST(this.valor.getNodo());
    nodo.agregarHijo(';');
    return nodo;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    //tomar el tipoDato de la variable
    let variable = tabla.getVariable(this.identificador);
    if (variable != null) {
      let val = this.valor.interpretar(arbol, tabla);
      if (variable.gettipo().getTipo() != this.valor.tipoDato.getTipo()) {
        return new Errores(
          'SEMANTICO',
          'VARIABLE ' + this.identificador + ' TIPOS DE DATOS DIFERENTES',
          this.fila,
          this.columna
        );
      } else {
        variable.setvalor(val);
        arbol.actualizarTabla(
          this.identificador,
          variable.getvalor(),
          this.fila.toString(),
          tabla.getNombre().toString(),
          this.columna.toString()
        );
        //identificadorm,
        //actualizar valor de la tabla y no crear otra equis des
      }
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
