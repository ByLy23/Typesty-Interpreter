import { listaErrores } from "../../../indexControllers";
import { Instruccion } from "../../Abastracto/Instruccion";
import Errores from "../../Excepciones/Errores";
import Arbol from "../../Simbolos/Arbol";
import tablaSimbolos from "../../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../../Simbolos/Tipo";

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
    do {
      let nuevaTabla = new tablaSimbolos(tabla);
      this.expresion.forEach((valor) => {
        let a = valor.interpretar(arbol, nuevaTabla);
        if (a instanceof Errores) {
          listaErrores.push(a);
          arbol.actualizaConsola((<Errores>a).returnError());
        }
      });
    } while (this.condicion.interpretar(arbol, tabla));
  }
}
