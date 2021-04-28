import tablaSimbolos from './tablaSimbolos';
import { Instruccion } from '../Abastracto/Instruccion';
import Errores from '../Excepciones/Errores';
import Metodos from '../Instrucciones/Metodos';
import Funciones from '../Instrucciones/Funciones';
import { reporteTabla } from '../../Reportes/reporteTabla';
import { listaSimbolos } from '../../indexControllers';
import obtenerValor from '../../reportes/cambiarTipo';
export default class Arbol {
  private instrucciones: Array<Instruccion>;
  private errores: Array<Errores>;
  private funciones: Array<Instruccion>;

  public getFuncion(identificador: String) {
    for (let f of this.funciones) {
      if (f instanceof Metodos) {
        if (
          identificador.toLowerCase() ==
          (<Metodos>f).identificador.toLowerCase()
        ) {
          let nuevoSimbolo = new reporteTabla(
            f.identificador,
            '',
            'Metodo',
            'Void',
            '',
            f.fila.toString(),
            f.columna.toString()
          );
          listaSimbolos.push(nuevoSimbolo);
          return f;
        }
      } else if (f instanceof Funciones) {
        if (
          identificador.toLowerCase() ==
          (<Funciones>f).identificador.toLowerCase()
        ) {
          let nuevoSimbolo = new reporteTabla(
            f.identificador,
            '',
            'Funcion',
            obtenerValor(f.tipoDato.getTipo()) + '',
            '',
            f.fila.toString(),
            f.columna.toString()
          );
          listaSimbolos.push(nuevoSimbolo);
          return f;
        }
      }
    }
  }
  public getfunciones(): Array<Instruccion> {
    return this.funciones;
  }
  public setfunciones(value: Array<Instruccion>) {
    this.funciones = value;
  }
  public geterrores(): Array<Errores> {
    return this.errores;
  }
  public seterrores(value: Array<Errores>) {
    this.errores = value;
  }

  public getinstrucciones(): Array<Instruccion> {
    return this.instrucciones;
  }
  public setinstrucciones(value: Array<Instruccion>) {
    this.instrucciones = value;
  }
  private consola: String;
  public getconsola(): String {
    return this.consola;
  }
  public setconsola(value: String) {
    this.consola = value;
  }
  public actualizaConsola(uptodate: String) {
    this.consola = `${this.consola}${uptodate}\n`;
  }
  private tablaGlobal: tablaSimbolos;
  public gettablaGlobal(): tablaSimbolos {
    return this.tablaGlobal;
  }
  public settablaGlobal(value: tablaSimbolos) {
    this.tablaGlobal = value;
  }

  constructor(instrucciones: Array<Instruccion>) {
    this.instrucciones = instrucciones;
    this.consola = '';
    this.tablaGlobal = new tablaSimbolos();
    this.errores = new Array<Errores>();
    this.funciones = new Array<Instruccion>();
  }
}
