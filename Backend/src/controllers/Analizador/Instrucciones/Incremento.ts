import { Instruccion } from '../Abastracto/Instruccion';
import nodoAST from '../Abastracto/nodoAST';
import Errores from '../Excepciones/Errores';
import Identificador from '../Expresiones/Identificador';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';

export default class Decremento extends Instruccion {
  private identificador: Identificador | Instruccion;
  constructor(
    identificador: Identificador | Instruccion,
    fila: Number,
    columna: Number
  ) {
    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.identificador = identificador;
  }
  public getNodo(): nodoAST {
    let nodo = new nodoAST('INCREMENTO');
    nodo.agregarHijoAST(this.identificador.getNodo());
    nodo.agregarHijo('+');
    nodo.agregarHijo('+');
    return nodo;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    //tomar el tipoDato de la variable
    if (this.identificador instanceof Identificador) {
      let variable = tabla.getVariable(this.identificador.identificador);
      if (variable != null) {
        if (
          variable.gettipo().getTipo() == tipoDato.ENTERO ||
          variable.gettipo().getTipo() == tipoDato.DECIMAL
        ) {
          this.tipoDato.setTipo(variable.gettipo().getTipo());
          let uno = variable.getvalor();
          uno++;
          variable.setvalor(uno);
        } else {
          return new Errores(
            'SEMANTICO',
            'VARIABLE ' + this.identificador + ' DEBE SER VALOR NUMERICO',
            this.fila,
            this.columna
          );
        }
      } else {
        return new Errores(
          'SEMANTICO',
          'VARIABLE ' + this.identificador + ' NO EXISTE',
          this.fila,
          this.columna
        );
      }
    } else {
      let valE = this.identificador.interpretar(arbol, tabla);
      if (valE instanceof Errores) return valE;
      if (this.identificador.tipoDato.getTipo() == tipoDato.ENTERO) {
        this.tipoDato.setTipo(tipoDato.ENTERO);
        let otro = parseInt(valE);
        otro++;
        return otro;
      } else if (this.identificador.tipoDato.getTipo() == tipoDato.DECIMAL) {
        this.tipoDato.setTipo(tipoDato.DECIMAL);
        let otro = parseFloat(valE);
        otro++;
        return otro;
      } else {
        return new Errores(
          'SEMANTICO',
          'VARIABLE ' + this.identificador + ' DEBE SER VALOR NUMERICO',
          this.fila,
          this.columna
        );
      }
    }
  }
}
