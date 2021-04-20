import { listaErrores } from '../../../indexControllers';
import { Instruccion } from '../../Abastracto/Instruccion';
import Errores from '../../Excepciones/Errores';
import Arbol from '../../Simbolos/Arbol';
import tablaSimbolos from '../../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../../Simbolos/Tipo';
import Return from '../Return';

export default class condSwitchCase extends Instruccion {
  private expresion: Instruccion;
  private instrucciones: Instruccion[];
  constructor(
    fila: Number,
    columna: Number,
    expresion: Instruccion,
    instrucciones: Instruccion[]
  ) {
    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.expresion = expresion;
    this.instrucciones = instrucciones;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    let val = this.expresion.interpretar(arbol, tabla);
    if (val) {
      let nuevaTabla = new tablaSimbolos(tabla);
      for (let i = 0; i < this.instrucciones.length; i++) {
        let a = this.instrucciones[i].interpretar(arbol, nuevaTabla);
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
