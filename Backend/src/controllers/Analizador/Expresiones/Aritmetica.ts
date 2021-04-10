import { Instruccion } from "../Abastracto/Instruccion";
import Errores from "../Excepciones/Errores";
import Arbol from "../Simbolos/Arbol";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";

export default class Aritmetica extends Instruccion {
  private operando1: Instruccion | undefined;
  private operando2: Instruccion | undefined;
  private operandoUnico: Instruccion | undefined;
  private operador: Operadores;

  constructor(
    operador: Operadores,
    fila: Number,
    columna: Number,
    op1: Instruccion,
    op2?: Instruccion
  ) {
    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.operador = operador;
    if (!op2) this.operandoUnico = this.operando1;
    else {
      this.operando1 = op1;
      this.operando2 = op2;
    }
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    let izq, der, uno;
    izq = der = uno = null;
    if (this.operandoUnico != null) {
      uno = this.operandoUnico.interpretar(arbol, tabla);
      if (uno instanceof Errores) return uno;
    } else {
      izq = this.operando1?.interpretar(arbol, tabla);
      if (izq instanceof Errores) return izq;
      der = this.operando2?.interpretar(arbol, tabla);
      if (der instanceof Errores) return der;
    }
    switch (this.operador) {
      case Operadores.SUMA:
        return this.operador1Suma(izq, der);
      case Operadores.RESTA:
        return this.operador1Resta(izq, der);
      case Operadores.MULTIPLICACION:
        return console.log("ACA LLEGA LA MULTI WIIII");
      case Operadores.DIVISION:
        return console.log("ACA LLEGA LA DIVISION WIIII");
      case Operadores.POTENCIA:
        return console.log("ACA LLEGA LA OTENCIA WIIII");
      case Operadores.MODULADOR:
        return console.log("ACA LLEGA LA MODULACION WIIII");
      default:
        return new Errores(
          "ERROR SEMANTICO",
          "OPERADOR INVALIDO",
          this.fila,
          this.columna
        );
    }
  }

  /*----------------------------------------------------------SUMA------------------------------------------------- */
  private operador1Suma(izq: any, der: any) {
    let op1 = this.operando1?.tipoDato.getTipo();
    let op2 = this.operando2?.tipoDato.getTipo();
    switch (
      op1 //operador 1
    ) {
      case tipoDato.ENTERO:
        return this.op2Suma(1, op2, izq, der);
      case tipoDato.DECIMAL:
        return this.op2Suma(2, op2, izq, der);
      case tipoDato.BOOLEANO:
        return this.op2Suma(3, op2, izq, der);
      case tipoDato.CADENA:
        return this.op2Suma(4, op2, izq, der);
      case tipoDato.CARACTER:
        return this.op2Suma(5, op2, izq, der);
    }
  }
  private op2Suma(numero: Number, op2: any, izq: any, der: any) {
    if (numero == 1) {
      //entero
      switch (
        op2 //OPERADOR 2
      ) {
        case tipoDato.ENTERO: //retorna entero
          this.tipoDato = new Tipo(tipoDato.ENTERO);
          return parseInt(izq) + parseInt(der);
        case tipoDato.DECIMAL: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          return parseFloat(izq) + parseFloat(der);
        case tipoDato.BOOLEANO: //retorna entero
          this.tipoDato = new Tipo(tipoDato.ENTERO);
          return der == "true" ? parseInt(izq) + 1 : parseInt(izq);
        case tipoDato.CADENA: //retorna cadena
          return izq + "" + der;
        case tipoDato.CARACTER: //retorna entero
          this.tipoDato = new Tipo(tipoDato.ENTERO);
          var da = der + "";
          var res = da.charCodeAt(1);
          return parseInt(izq) + res;
      }
    } else if (numero == 2) {
      //decimal
      switch (
        op2 //OPERADOR 2
      ) {
        case tipoDato.ENTERO: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          return parseFloat(izq) + parseFloat(der);
        case tipoDato.DECIMAL: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          return parseFloat(izq) + parseFloat(der);
        case tipoDato.BOOLEANO: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          return der == "true" ? parseFloat(izq) + 1 : parseFloat(izq);
        case tipoDato.CADENA: //retorna cadena
          this.tipoDato = new Tipo(tipoDato.CADENA);
          return izq + "" + der;
        case tipoDato.CARACTER: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          var da = der + "";
          var res = da.charCodeAt(1);
          return parseFloat(izq) + res;
      }
    } else if (numero == 3) {
      //boolean
      switch (
        op2 //OPERADOR 2
      ) {
        case tipoDato.ENTERO: //retorna entero
          this.tipoDato = new Tipo(tipoDato.ENTERO);
          if (izq == "true") return parseInt(der) + 1;
          return parseInt(der);
        case tipoDato.DECIMAL: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          return izq == "true" ? parseFloat(der) + 1 : parseFloat(der);
        case tipoDato.CADENA: //retorna cadena
          this.tipoDato = new Tipo(tipoDato.CADENA);
          return izq + "" + der;
        default:
          //error
          return new Errores(
            "SEMANTICO",
            "TIPO DE DATO NO PERMITIDO",
            this.fila,
            this.columna
          );
      }
    } else if (numero == 4) {
      //cadena
      switch (
        op2 //OPERADOR 2
      ) {
        case tipoDato.ENTERO: //retorna cadena
          this.tipoDato = new Tipo(tipoDato.CADENA);
          return izq + "" + der;
        case tipoDato.DECIMAL: //retorna cadena
          this.tipoDato = new Tipo(tipoDato.CADENA);
          return izq + "" + der;
        case tipoDato.BOOLEANO: //retorna cadena
          this.tipoDato = new Tipo(tipoDato.CADENA);
          return izq + "" + der;
        case tipoDato.CADENA: //retorna cadena
          this.tipoDato = new Tipo(tipoDato.CADENA);
          return izq + "" + der;
        case tipoDato.CARACTER: //retorna cadena
          this.tipoDato = new Tipo(tipoDato.CADENA);
          var dato = der.replace(/['"]+/g, "");
          return izq + "" + dato;
      }
    } else if (numero == 5) {
      //caracter
      switch (
        op2 //OPERADOR 2
      ) {
        case tipoDato.ENTERO: //retorna entero
          this.tipoDato = new Tipo(tipoDato.ENTERO);
          var da1 = izq + "";
          var res1 = da1.charCodeAt(1);
          return res1 + parseInt(der);
        case tipoDato.DECIMAL: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          var da1 = izq + "";
          var res1 = da1.charCodeAt(1);
          return res1 + parseFloat(der);
        case tipoDato.CADENA: //retorna cadena
          this.tipoDato = new Tipo(tipoDato.CADENA);
          var otro11 = izq.replace(/['"]+/g, "");
          return otro11 + "" + der;
        case tipoDato.CARACTER: //retorna cadena
          this.tipoDato = new Tipo(tipoDato.CADENA);
          var otro = der.replace(/['"]+/g, "");
          var otro1 = izq.replace(/['"]+/g, "");
          return otro1 + "" + otro;
        default:
          //error semantico
          return new Errores(
            "SEMANTICO",
            "TIPO DE DATO NO PERMITIDO",
            this.fila,
            this.columna
          );
      }
    }
  }
  /*----------------------------------------------------------RESTA------------------------------------------------- */
  private operador1Resta(izq: any, der: any) {
    let op1 = this.operando1?.tipoDato.getTipo();
    let op2 = this.operando2?.tipoDato.getTipo();
    switch (
      op1 //operador 1
    ) {
      case tipoDato.ENTERO:
        return this.op2Resta(1, op2, izq, der);
      case tipoDato.DECIMAL:
        return this.op2Resta(2, op2, izq, der);
      case tipoDato.BOOLEANO:
        return this.op2Resta(3, op2, izq, der);
      case tipoDato.CADENA:
        return this.op2Resta(4, op2, izq, der);
      case tipoDato.CARACTER:
        return this.op2Resta(5, op2, izq, der);
    }
  }
  private op2Resta(numero: Number, op2: any, izq: any, der: any) {
    if (numero == 1) {
      //entero
      switch (
        op2 //OPERADOR 2
      ) {
        case tipoDato.ENTERO: //retorna entero
          this.tipoDato = new Tipo(tipoDato.ENTERO);
          return parseInt(izq) - parseInt(der);
        case tipoDato.DECIMAL: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          return parseFloat(izq) - parseFloat(der);
        case tipoDato.BOOLEANO: //retorna entero
          this.tipoDato = new Tipo(tipoDato.ENTERO);
          return der == "true" ? parseInt(izq) - 1 : parseInt(izq);
        case tipoDato.CARACTER: //retorna entero
          this.tipoDato = new Tipo(tipoDato.ENTERO);
          var da = der + "";
          var res = da.charCodeAt(1);
          return parseInt(izq) - res;
        default:
          //error
          return new Errores(
            "SEMANTICO",
            "TIPO DE DATO NO PERMITIDO",
            this.fila,
            this.columna
          );
      }
    } else if (numero == 2) {
      //decimal
      switch (
        op2 //OPERADOR 2
      ) {
        case tipoDato.ENTERO: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          return parseFloat(izq) - parseFloat(der);
        case tipoDato.DECIMAL: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          return parseFloat(izq) - parseFloat(der);
        case tipoDato.BOOLEANO: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          return der == "true" ? parseFloat(izq) - 1 : parseFloat(izq);
        case tipoDato.CARACTER: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          var da = der + "";
          var res = da.charCodeAt(1);
          return parseFloat(izq) - res;
        default:
          //error
          return new Errores(
            "SEMANTICO",
            "TIPO DE DATO NO PERMITIDO",
            this.fila,
            this.columna
          );
      }
    } else if (numero == 3) {
      //boolean
      switch (
        op2 //OPERADOR 2
      ) {
        case tipoDato.ENTERO: //retorna entero
          this.tipoDato = new Tipo(tipoDato.ENTERO);
          return izq == "true" ? parseInt(der) - 1 : parseInt(der);
        case tipoDato.DECIMAL: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          return izq == "true" ? parseFloat(der) - 1 : parseFloat(der);
        default:
          //error
          return new Errores(
            "SEMANTICO",
            "TIPO DE DATO NO PERMITIDO",
            this.fila,
            this.columna
          );
      }
    } else if (numero == 4) {
      //cadena
      return new Errores(
        "SEMANTICO",
        "TIPO DE DATO NO PERMITIDO",
        this.fila,
        this.columna
      );
    } else if (numero == 5) {
      //caracter
      switch (
        op2 //OPERADOR 2
      ) {
        case tipoDato.ENTERO: //retorna entero
          this.tipoDato = new Tipo(tipoDato.ENTERO);
          var da1 = izq + "";
          var res1 = da1.charCodeAt(1);
          return res1 - parseInt(der);
        case tipoDato.DECIMAL: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          var da1 = izq + "";
          var res1 = da1.charCodeAt(1);
          return res1 - parseFloat(der);
        default:
          //error semantico
          return new Errores(
            "SEMANTICO",
            "TIPO DE DATO NO PERMITIDO",
            this.fila,
            this.columna
          );
      }
    }
  }
}
export enum Operadores {
  SUMA,
  RESTA,
  MULTIPLICACION,
  DIVISION,
  POTENCIA,
  MODULADOR,
  MENOSNUM,
}
