import { listaSimbolos } from '../../indexControllers';
import obtenerValor from '../../reportes/cambiarTipo';
import { reporteTabla } from '../../Reportes/reporteTabla';
import { Instruccion } from '../Abastracto/Instruccion';
import nodoAST from '../Abastracto/nodoAST';
import Errores from '../Excepciones/Errores';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';
import Declaracion from './Declaracion';
import Funciones from './Funciones';
import Metodos from './Metodos';

export default class LlamadaFuncMetd extends Instruccion {
  private identificador: String;
  private parametros: Instruccion[];
  constructor(
    identificador: String,
    parametros: Instruccion[],
    fila: Number,
    columna: Number
  ) {
    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.identificador = identificador;
    this.parametros = parametros;
  }

  public getNodo(): nodoAST {
    let nodo = new nodoAST('LLAMADA');
    nodo.agregarHijo(this.identificador + '');
    nodo.agregarHijo('(');
    this.parametros.forEach((element) => {
      nodo.agregarHijoAST(element.getNodo());
    });
    nodo.agregarHijo(')');
    return nodo;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    let funcion = arbol.getFuncion(this.identificador);
    if (funcion == null)
      return new Errores(
        'SEMANTICO',
        'NO SE ENCONTRO LA FUNCION',
        this.fila,
        this.columna
      );
    if (funcion instanceof Metodos) {
      let metodo = <Metodos>funcion;
      if (metodo.parametros.length == this.parametros?.length) {
        let nuevaTabla = new tablaSimbolos(arbol.gettablaGlobal());
        for (let param = 0; param < this.parametros.length; param++) {
          let newVal = this.parametros[param].interpretar(arbol, tabla);
          if (newVal instanceof Errores) return newVal;
          let dec = new Declaracion(
            metodo.parametros[param].tipato,
            metodo.fila,
            metodo.columna,
            metodo.parametros[param].identificador
          );
          let nuevaDec = dec.interpretar(arbol, nuevaTabla);
          if (nuevaDec instanceof Errores) return nuevaDec;

          let variable = nuevaTabla.getVariable(
            metodo.parametros[param].identificador
          );
          if (variable != null) {
            if (
              variable.gettipo().getTipo() !=
              this.parametros[param].tipoDato.getTipo()
            ) {
              return new Errores(
                'SEMANTICO',
                'VARIABLE ' +
                  metodo.parametros[param].identificador +
                  ' TIPOS DE DATOS DIFERENTES',
                this.fila,
                this.columna
              );
            } else {
              variable.setvalor(newVal);
              nuevaTabla.setNombre(metodo.identificador);
              let nuevoSimbolo = new reporteTabla(
                this.identificador,
                '',
                'Metodo',
                'Void',
                '',
                this.fila.toString(),
                this.columna.toString()
              );
              listaSimbolos.push(nuevoSimbolo);
            }
          } else {
            return new Errores(
              'SEMANTICO',
              'VARIABLE ' +
                metodo.parametros[param].identificador +
                ' NO EXISTE',
              this.fila,
              this.columna
            );
          }
        }
        let nuevMet = metodo.interpretar(arbol, nuevaTabla);
        if (nuevMet instanceof Errores) return nuevMet;
      } else {
        return new Errores(
          'SEMANTICO',
          'PARAMETROS NO COINCIDENTES',
          this.fila,
          this.columna
        );
      }
    } else if (funcion instanceof Funciones) {
      let metodo = <Funciones>funcion;
      if (metodo.parametros.length == this.parametros?.length) {
        let nuevaTabla = new tablaSimbolos(arbol.gettablaGlobal());
        for (let param = 0; param < this.parametros.length; param++) {
          let newVal = this.parametros[param].interpretar(arbol, tabla);
          if (newVal instanceof Errores) return newVal;
          let dec = new Declaracion(
            metodo.parametros[param].tipato,
            metodo.fila,
            metodo.columna,
            metodo.parametros[param].identificador
          );
          let nuevaDec = dec.interpretar(arbol, nuevaTabla);
          if (nuevaDec instanceof Errores) return nuevaDec;

          let variable = nuevaTabla.getVariable(
            metodo.parametros[param].identificador
          );
          if (variable != null) {
            if (
              variable.gettipo().getTipo() !=
              this.parametros[param].tipoDato.getTipo()
            ) {
              return new Errores(
                'SEMANTICO',
                'VARIABLE ' +
                  metodo.parametros[param].identificador +
                  ' TIPOS DE DATOS DIFERENTES',
                this.fila,
                this.columna
              );
            } else {
              variable.setvalor(newVal);
              nuevaTabla.setNombre(metodo.identificador);
              let nuevoSimbolo = new reporteTabla(
                this.identificador,
                variable.getvalor(),
                'Funcion',
                obtenerValor(this.tipoDato.getTipo()) + '',
                tabla.getNombre(),
                this.fila.toString(),
                this.columna.toString()
              );
              listaSimbolos.push(nuevoSimbolo);
              //nueva variable
            }
          } else {
            return new Errores(
              'SEMANTICO',
              'VARIABLE ' +
                metodo.parametros[param].identificador +
                ' NO EXISTE',
              this.fila,
              this.columna
            );
          }
        }
        let nuevMet = metodo.interpretar(arbol, nuevaTabla);
        if (nuevMet instanceof Errores) return nuevMet;
        this.tipoDato = metodo.tipoDato;
        return nuevMet;
      } else {
        return new Errores(
          'SEMANTICO',
          'PARAMETROS NO COINCIDENTES',
          this.fila,
          this.columna
        );
      }
    }
  }
}