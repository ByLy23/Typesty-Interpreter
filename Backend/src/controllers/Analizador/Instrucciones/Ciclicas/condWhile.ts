import { listaErrores } from '../../../indexControllers';
import { Instruccion } from '../../Abastracto/Instruccion';
import Errores from '../../Excepciones/Errores';
import Arbol from '../../Simbolos/Arbol';
import tablaSimbolos from '../../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../../Simbolos/Tipo';
import Return from '../Return';

export default class condWhile extends Instruccion {
  private condicion: Instruccion;
  private expresion: Instruccion[];
  constructor(
    condicion: Instruccion,
    expresion: Instruccion[],
    fila: Number,
    columna: Number
  ) {
    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.condicion = condicion;
    this.expresion = expresion;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    let val = this.condicion.interpretar(arbol, tabla);
    if (val instanceof Errores) return val;
    if (this.condicion.tipoDato.getTipo() != tipoDato.BOOLEANO) {
      return new Errores(
        'SEMANTICO',
        'DATO DEBE SER BOOLEANO',
        this.fila,
        this.columna
      );
    }
    while (this.condicion.interpretar(arbol, tabla)) {
      let nuevaTabla = new tablaSimbolos(tabla);
      for (let i = 0; i < this.expresion.length; i++) {
        let a = this.expresion[i].interpretar(arbol, nuevaTabla);
        if (a instanceof Errores) {
          listaErrores.push(a);
          arbol.actualizaConsola((<Errores>a).returnError());
        }
        if (a instanceof Return) return a;
        if (a == 'ByLyContinue') break;
        if (a == 'ByLy23') return;
      }
    }
  }
}
