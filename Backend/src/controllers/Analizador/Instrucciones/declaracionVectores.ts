import obtenerValor from '../../Reportes/cambiarTipo';
import { reporteTabla } from '../../Reportes/reporteTabla';
import { Instruccion } from '../Abastracto/Instruccion';
import nodoAST from '../Abastracto/nodoAST';
import Errores from '../Excepciones/Errores';
import Arbol from '../Simbolos/Arbol';
import Simbolo from '../Simbolos/Simbolo';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';

export default class declaracionVectores extends Instruccion {
  private tipo: Tipo;
  private identificador: string;
  private tipoDeclaracion: boolean; //true tipo 1 false tipo 2
  private cantidad?: Instruccion;
  private tipoVector?: Tipo;
  private listaValores?: Instruccion[];

  constructor(
    tipo: Tipo,
    identificador: string,
    tipoDeclaracion: boolean,
    fila: number,
    columna: number,
    cantidad?: Instruccion,
    tipoVector?: Tipo,
    listaValores?: Instruccion[]
  ) {
    super(tipo, fila, columna);
    this.tipo = tipo;
    this.identificador = identificador;
    this.tipoDeclaracion = tipoDeclaracion;
    this.cantidad = cantidad;
    this.tipoVector = tipoVector;
    this.listaValores = listaValores;
  }
  public getNodo() {
    let nodo = new nodoAST('VECTORES');
    return nodo;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    if (this.tipoDeclaracion) {
      if (this.tipoVector == null)
        return new Errores(
          'SINTACTICO',
          'NO EXISTE TIPO DE DATO DE VECTOR',
          this.fila,
          this.columna
        );
      if (this.tipo.getTipo() != this.tipoVector?.getTipo())
        return new Errores(
          'SEMANTICO',
          'TIPOS DE DATOS DIFERENTES EN DECLARACION',
          this.fila,
          this.columna
        );
      else {
        let numero = this.cantidad?.interpretar(arbol, tabla);
        if (numero instanceof Errores) return numero;
        if (this.cantidad?.tipoDato.getTipo() != tipoDato.ENTERO)
          return new Errores(
            'SEMANTICO',
            'VARIABLE NO ES TIPO ENTERO',
            this.fila,
            this.columna
          );
        let num = parseInt(numero);
        let arreglo: any = [];
        for (let i = 0; i < num; i++) {
          arreglo[i] = [];
        }
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
              arreglo,
              this.fila.toString(),
              tabla.getNombre().toString(),
              this.columna.toString()
            )
          ) {
            let nuevoSimbolo = new reporteTabla(
              this.identificador,
              arreglo,
              'Vector',
              obtenerValor(this.tipo.getTipo()) + '',
              tabla.getNombre(),
              this.fila.toString(),
              this.columna.toString()
            );
            arbol.listaSimbolos.push(nuevoSimbolo);
          }
        }
      }
    } else {
      let arreglo: any = [];
      if (this.listaValores == null || this.listaValores.length <= 0)
        return new Errores(
          'SEMANTICO',
          'NO TIENE NINGUN VALOR',
          this.fila,
          this.columna
        );
      for (let i = 0; i < this.listaValores.length; i++) {
        let valor = this.listaValores[i].interpretar(arbol, tabla);
        if (valor instanceof Errores) return valor;
        if (this.tipo.getTipo() != this.listaValores[i].tipoDato.getTipo())
          return new Errores(
            'SEMANTICO',
            'TIPO DE DATO DIFERENTE',
            this.fila,
            this.columna
          );
        arreglo[i] = valor;
      }
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
            arreglo,
            this.fila.toString(),
            tabla.getNombre().toString(),
            this.columna.toString()
          )
        ) {
          let nuevoSimbolo = new reporteTabla(
            this.identificador,
            arreglo,
            'Vector',
            obtenerValor(this.tipo.getTipo()) + '',
            tabla.getNombre(),
            this.fila.toString(),
            this.columna.toString()
          );
          arbol.listaSimbolos.push(nuevoSimbolo);
        }
      }
      console.log(tabla.getVariable(this.identificador));
      //declaracion tipo 2
    }
  }
}
