import { Instruccion } from '../Abastracto/Instruccion';
import Errores from '../Excepciones/Errores';
import Arbol from '../Simbolos/Arbol';
import Simbolo from '../Simbolos/Simbolo';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';

export default class Declaracion extends Instruccion {
  private tipo: Tipo;
  private identificador: String;
  private valor: Instruccion | undefined;
  constructor(
    tipo: Tipo,
    fila: Number,
    columna: Number,
    id: String,
    valor?: Instruccion
  ) {
    super(tipo, fila, columna);
    this.tipo = tipo;
    this.identificador = id;
    this.valor = valor;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    if (this.valor === undefined) {
      switch (this.tipo.getTipo()) {
        case tipoDato.ENTERO:
          if (
            tabla.setVariable(new Simbolo(this.tipo, this.identificador, 0)) ==
            'La variable existe actualmente'
          ) {
            return new Errores(
              'SEMANTICO',
              'LA VARIABLE ' + this.identificador + ' EXISTE ACTUALMENTE',
              this.fila,
              this.columna
            );
          } else
            console.log(
              `ID:${this.identificador} tipo:Variable Linea:${
                this.fila
              } Columna:${this.columna} Valor:0 Tipo:${this.tipo.getTipo()} `
            );
          break;
        case tipoDato.DECIMAL:
          if (
            tabla.setVariable(
              new Simbolo(this.tipo, this.identificador, 0.0)
            ) == 'La variable existe actualmente'
          ) {
            return new Errores(
              'SEMANTICO',
              'LA VARIABLE ' + this.identificador + ' EXISTE ACTUALMENTE',
              this.fila,
              this.columna
            );
          } else
            console.log(
              `ID:${this.identificador} tipo:Variable Linea:${
                this.fila
              } Columna:${this.columna} Valor:0.0 Tipo:${this.tipo.getTipo()}`
            );
          break;
        case tipoDato.CARACTER:
          if (
            tabla.setVariable(
              new Simbolo(this.tipo, this.identificador, '\u0000')
            ) == 'La variable existe actualmente'
          ) {
            return new Errores(
              'SEMANTICO',
              'LA VARIABLE ' + this.identificador + ' EXISTE ACTUALMENTE',
              this.fila,
              this.columna
            );
          } else
            console.log(
              `ID:${this.identificador} tipo:Variable Linea:${
                this.fila
              } Columna:${this.columna} Valor:0 Tipo:${this.tipo.getTipo()}`
            );
          break;
        case tipoDato.CADENA:
          if (
            tabla.setVariable(new Simbolo(this.tipo, this.identificador, '')) ==
            'La variable existe actualmente'
          ) {
            return new Errores(
              'SEMANTICO',
              'LA VARIABLE ' + this.identificador + ' EXISTE ACTUALMENTE',
              this.fila,
              this.columna
            );
          } else
            console.log(
              `ID:${this.identificador} tipo:Variable Linea:${
                this.fila
              } Columna:${this.columna} Valor:${''} Tipo:${this.tipo.getTipo()}`
            );
          break;
        case tipoDato.BOOLEANO:
          if (
            tabla.setVariable(
              new Simbolo(this.tipo, this.identificador, true)
            ) == 'La variable existe actualmente'
          ) {
            return new Errores(
              'SEMANTICO',
              'LA VARIABLE ' + this.identificador + ' EXISTE ACTUALMENTE',
              this.fila,
              this.columna
            );
          } else
            console.log(
              `ID:${this.identificador} tipo:Variable Linea:${
                this.fila
              } Columna:${this.columna} Valor:${true} Tipo:${this.tipo}`
            );
          break;
      }
    } else {
      let val = this.valor.interpretar(arbol, tabla);
      if (this.tipo.getTipo() != this.valor.tipoDato.getTipo()) {
        return new Errores(
          'SEMANTICO',
          'TIPO DE VALOR DIFERENTE',
          this.fila,
          this.columna
        );
      } else {
        if (
          tabla.setVariable(new Simbolo(this.tipo, this.identificador, val)) ==
          'La variable existe actualmente'
        ) {
          return new Errores(
            'SEMANTICO',
            'LA VARIABLE ' + this.identificador + ' EXISTE ACTUALMENTE',
            this.fila,
            this.columna
          );
        } else {
          console.log(
            `ID:${this.identificador} tipo:Variable Linea:${
              this.fila
            } Columna:${
              this.columna
            } Valor:${val} Tipo:${this.tipo.getTipo()} Ambito:${tabla.getTabla()}`
          );
        }
      }
    }
  }
}
