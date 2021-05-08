import obtenerValor from '../../Reportes/cambiarTipo';
import { reporteTabla } from '../../Reportes/reporteTabla';
import { Instruccion } from '../Abastracto/Instruccion';
import nodoAST from '../Abastracto/nodoAST';
import Errores from '../Excepciones/Errores';
import Arbol from '../Simbolos/Arbol';
import Simbolo from '../Simbolos/Simbolo';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';

export default class declaracionListas extends Instruccion {
  private tipo: Tipo;
  private identificador: string;
  private tipoVector: Tipo;

  constructor(
    tipo: Tipo,
    identificador: string,
    fila: number,
    columna: number,
    tipoVector: Tipo
  ) {
    super(tipo, fila, columna);
    this.tipo = tipo;
    this.identificador = identificador.toLowerCase();
    this.tipoVector = tipoVector;
  }
  public getNodo() {
    let nodo = new nodoAST('LISTAS');
    nodo.agregarHijo('list');
    nodo.agregarHijo('<');
    nodo.agregarHijo(obtenerValor(this.tipo.getTipo()) + '');
    nodo.agregarHijo('>');
    nodo.agregarHijo(this.identificador);
    nodo.agregarHijo('=');
    nodo.agregarHijo('new');
    nodo.agregarHijo('list');
    nodo.agregarHijo('<');
    nodo.agregarHijo(obtenerValor(this.tipoVector.getTipo()) + '');
    nodo.agregarHijo('>');
    nodo.agregarHijo(';');
    return nodo;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    if (this.tipo.getTipo() != this.tipoVector?.getTipo())
      return new Errores(
        'SEMANTICO',
        'TIPOS DE DATOS DIFERENTES EN DECLARACION',
        this.fila,
        this.columna
      );
    else {
      let arreglo = new Array();
      if (
        tabla.setVariable(
          new Simbolo(this.tipo, this.identificador, arreglo)
        ) == 'La variable existe actualmente'
      )
        return new Errores(
          'SEMANTICO',
          'LA VARIABLE ' + this.identificador + ' EXISTE ACTUALMENTE',
          this.fila,
          this.columna
        );
      else {
        if (
          !arbol.actualizarTabla(
            this.identificador,
            arreglo.toString(),
            this.fila.toString(),
            tabla.getNombre().toString(),
            this.columna.toString()
          )
        ) {
          let nuevoSimbolo = new reporteTabla(
            this.identificador,
            arreglo.toString(),
            'lista',
            obtenerValor(this.tipo.getTipo()) + '',
            tabla.getNombre(),
            this.fila.toString(),
            this.columna.toString()
          );
          arbol.listaSimbolos.push(nuevoSimbolo);
        }
      }
    }
  }
}
