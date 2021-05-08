import { Instruccion } from '../Abastracto/Instruccion';
import nodoAST from '../Abastracto/nodoAST';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';

export default class funcNativa extends Instruccion {
  private identificador: string;
  private expresion: Instruccion;
  constructor(
    identificador: string,
    expresion: Instruccion,
    fila: number,
    columna: number
  ) {
    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.identificador = identificador.toLowerCase();
    this.expresion = expresion;
  }
  public getNodo() {
    let nodo = new nodoAST('FUNCION-NATIVA');
    return nodo;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    console.log(`${this.identificador} ${this.expresion}`);
    switch (this.identificador) {
      case 'tolower':
        this.tipoDato = new Tipo(tipoDato.CADENA);
        return '';
      case 'toupper':
        this.tipoDato = new Tipo(tipoDato.CADENA);
        return '';
      case 'length':
        this.tipoDato = new Tipo(tipoDato.ENTERO);
        break;
      case 'truncate':
        this.tipoDato = new Tipo(tipoDato.ENTERO);
        break;
      case 'round':
        this.tipoDato = new Tipo(tipoDato.ENTERO);
        break;
      case 'typeof':
        this.tipoDato = new Tipo(tipoDato.CADENA);
        break;
      case 'tostring':
        this.tipoDato = new Tipo(tipoDato.CADENA);
        break;
      case 'tochararray':
        //this.tipoDato = new Tipo(tipoDato.CADENA); RETORNA EL TIPO DE DATO QUE TENGA EL IDENTIFICADOR
        break;
    }
  }
}
/*
toupper
    cadena
    retorna cadena
tolower
    cadena
    retorna cadena
length
    vector, lista, cadena
    retorna entero
truncate
    double, entero
    retorna entero
round
    double >=0.5 o <0.5
    retorna entero
typeof
    tipoDato
    retorna string
    si es no que vaya a buscar en la lista con el metodo buscartipo para ver si es vector o lista
toString
    numerico, booleano y caracter
    retorna string
tocharArray
    cadena en lista de caracteres
    retorna lista
*/
