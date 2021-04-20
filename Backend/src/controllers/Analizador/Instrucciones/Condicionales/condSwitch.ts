import { Instruccion } from '../../Abastracto/Instruccion';
import Arbol from '../../Simbolos/Arbol';
import tablaSimbolos from '../../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../../Simbolos/Tipo';

export default class condSwitch extends Instruccion {
  private expresion: Instruccion;
  private listaCasos: Instruccion[] | undefined;
  private defecto: Instruccion | undefined;
  constructor(
    fila: Number,
    columna: Number,
    expresion: Instruccion,
    listaCasos: Instruccion[],
    defecto: Instruccion
  ) {
    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.expresion = expresion;
    this.listaCasos = listaCasos;
    this.defecto = defecto;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {}
}
