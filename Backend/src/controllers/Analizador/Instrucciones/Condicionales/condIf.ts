import { listaErrores } from "../../../indexControllers";
import { Instruccion } from "../../Abastracto/Instruccion";
import Errores from "../../Excepciones/Errores";
import Arbol from "../../Simbolos/Arbol";
import tablaSimbolos from "../../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../../Simbolos/Tipo";

export default class condIf extends Instruccion {
  private cond1: Instruccion;
  private condIf: Instruccion[];
  private condElse: Instruccion[] | undefined;
  private condElseIf: Instruccion | undefined;
  constructor(
    fila: Number,
    columna: Number,
    cond1: Instruccion,
    condIf: Instruccion[],
    condElse: Instruccion[] | undefined,
    condElseIf: Instruccion | undefined
  ) {
    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.cond1 = cond1;
    this.condIf = condIf;
    this.condElse = condElse;
    this.condElseIf = condElseIf;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    let val = this.cond1.interpretar(arbol, tabla);
    console.log(val);
    if (val) {
      let nuevaTabla = new tablaSimbolos(tabla);
      this.condIf.forEach((valor) => {
        let a = valor.interpretar(arbol, nuevaTabla);
        if (a instanceof Errores) {
          listaErrores.push(a);
          arbol.actualizaConsola((<Errores>a).returnError());
        }
      });
    } else {
      if (this.condElse != undefined) {
        let nuevaTabla = new tablaSimbolos(tabla);
        this.condElse?.forEach((valor) => {
          let a = valor.interpretar(arbol, nuevaTabla);
          if (a instanceof Errores) {
            listaErrores.push(a);
            arbol.actualizaConsola((<Errores>a).returnError());
          }
        });
      } else if (this.condElseIf != undefined) {
        let b = this.condElseIf.interpretar(arbol, tabla);
        if (b instanceof Errores) return b;
      }
    }

    /*if (!this.cond2) {
      if (val == true) {
        this.condIf.forEach((valor) => {
          let a = valor.interpretar(arbol, tabla);
          if (a instanceof Errores) return a;
        });
      }
    } else {
      if (val == true) {
        this.condIf.forEach((valor) => {
          let a = valor.interpretar(arbol, tabla);
          if (a instanceof Errores) return a;
        });
      } else {
        this.condElse?.forEach((valor) => {
          let a = valor.interpretar(arbol, tabla);
          if (a instanceof Errores) return a;
        });
      }
    }*/
  }
}
