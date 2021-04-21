import { Instruccion } from '../Abastracto/Instruccion';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Tipo from '../Simbolos/Tipo';

export default class Metodos extends Instruccion {
  private identificador: String;
  private parametros: any;
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
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {}
}
