import { listaErrores } from '../../../indexControllers';
import { Instruccion } from '../../Abastracto/Instruccion';
import nodoAST from '../../Abastracto/nodoAST';
import Errores from '../../Excepciones/Errores';
import Arbol from '../../Simbolos/Arbol';
import tablaSimbolos from '../../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../../Simbolos/Tipo';
import Return from '../Return';
import condSwitchCase from './condSwitchCase';

export default class condSwitch extends Instruccion {
  private expresion: Instruccion;
  private listaCasos: condSwitchCase[] | undefined;
  private defecto: Instruccion | undefined;
  constructor(
    fila: number,
    columna: number,
    expresion: Instruccion,
    listaCasos: condSwitchCase[],
    defecto: Instruccion
  ) {
    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.expresion = expresion;
    this.listaCasos = listaCasos;
    this.defecto = defecto;
  }
  public getNodo(): nodoAST {
    let nodo = new nodoAST('SWITCH');
    nodo.agregarHijo('switch');
    nodo.agregarHijo('(');
    nodo.agregarHijoAST(this.expresion.getNodo());
    nodo.agregarHijo(')');
    nodo.agregarHijo('{');
    if (this.listaCasos != undefined) {
      this.listaCasos.forEach((element) => {
        nodo.agregarHijoAST(element.getNodo());
      });
    }
    if (this.defecto != undefined) {
      nodo.agregarHijoAST(this.defecto.getNodo());
    }
    nodo.agregarHijo('}');
    return nodo;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    if (this.listaCasos != undefined) {
      for (let caso of this.listaCasos) {
        caso.expresionCase = this.expresion;
        let a = caso.interpretar(arbol, tabla);
        if (a instanceof Errores) {
          listaErrores.push(a);
          arbol.actualizaConsola((<Errores>a).returnError());
        }
        if (a instanceof Return) return a;
        if (a == 'ByLyContinue') {
          listaErrores.push(
            new Errores(
              'SEMANTICO',
              'CONTINUE FUERA DE CICLO',
              this.fila,
              this.columna
            )
          );
          arbol.actualizaConsola((<Errores>a).returnError());
        }
        if (a == 'ByLy23') return;
      }
      //caso solo casos
    }
    if (this.defecto != undefined) {
      let a = this.defecto.interpretar(arbol, tabla);
      if (a instanceof Errores) {
        listaErrores.push(a);
        arbol.actualizaConsola((<Errores>a).returnError());
      }
      if (a instanceof Return) return a;
      if (a == 'ByLyContinue') {
        listaErrores.push(
          new Errores(
            'SEMANTICO',
            'CONTINUE FUERA DE CICLO',
            this.fila,
            this.columna
          )
        );
        arbol.actualizaConsola((<Errores>a).returnError());
      }
      if (a == 'ByLy23') return;
    }
  }
}
