import { Instruccion } from '../Abastracto/Instruccion';
import Errores from '../Excepciones/Errores';
import Arbol from '../Simbolos/Arbol';
import Simbolo from '../Simbolos/Simbolo';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Tipo from '../Simbolos/Tipo';
import Return from './Return';

export default class Metodos extends Instruccion {
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
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    for (let i = 0; i < this.instrucciones.length; i++) {
      let val = this.instrucciones[i].interpretar(arbol, tabla);
      if (val instanceof Errores) return val;
      if (this.instrucciones[i] instanceof Return) {
        if (val instanceof Return) {
          if (val.valor != null) {
            return new Errores(
              'SEMANTICO',
              'NO PUEDE DEVOLVER UN VALOR EN UN METODO',
              this.fila,
              this.columna
            );
          } else break;
        } else
          return new Errores(
            'SEMANTICO',
            'NO PUEDE DEVOLVER UN VALOR EN UN METODO',
            this.fila,
            this.columna
          );
      }
    }
  }
}
