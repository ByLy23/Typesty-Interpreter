import obtenerValor from '../../reportes/cambiarTipo';
import { Instruccion } from '../Abastracto/Instruccion';
import nodoAST from '../Abastracto/nodoAST';
import Errores from '../Excepciones/Errores';
import Arbol from '../Simbolos/Arbol';
import Simbolo from '../Simbolos/Simbolo';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Tipo from '../Simbolos/Tipo';
import Return from './Return';

export default class Funciones extends Instruccion {
  public identificador: String;
  public parametros: any;
  private instrucciones: Instruccion[];
  constructor(
    tipo: Tipo,
    fila: Number,
    columna: Number,
    identificador: String,
    parametros: any,
    instrucciones: Instruccion[]
  ) {
    super(tipo, fila, columna);
    this.identificador = identificador;
    this.parametros = parametros;
    this.instrucciones = instrucciones;
  }
  public getNodo(): nodoAST {
    let nodo = new nodoAST('FUNCION');
    nodo.agregarHijo(obtenerValor(this.tipoDato.getTipo()) + '');
    nodo.agregarHijo(this.identificador + '');
    nodo.agregarHijo('(');
    nodo.agregarHijoAST(this.parametros.getNodo());
    nodo.agregarHijo(')');
    nodo.agregarHijo('{');
    this.instrucciones.forEach((element) => {
      nodo.agregarHijoAST(element.getNodo());
    });
    nodo.agregarHijo('}');
    return nodo;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    for (let i = 0; i < this.instrucciones.length; i++) {
      let val = this.instrucciones[i].interpretar(arbol, tabla);
      if (val instanceof Errores) return val;
      if (val instanceof Return) {
        if (val.valor != null) {
          if (this.tipoDato.getTipo() == val.tipoDato.getTipo())
            return val.valor;
          else
            return new Errores(
              'SEMANTICO',
              'TIPOS DE DATOS DIFERENTES',
              this.fila,
              this.columna
            );
        } else {
          return new Errores(
            'SEMANTICO',
            'DEBE DEVOLVER UN VALOR EN LA FUNCION',
            this.fila,
            this.columna
          );
        }
      }
    }
  }
}
