import { listaErrores } from '../../../indexControllers';
import { Instruccion } from '../../Abastracto/Instruccion';
import Errores from '../../Excepciones/Errores';
import Arbol from '../../Simbolos/Arbol';
import tablaSimbolos from '../../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../../Simbolos/Tipo';
import Return from '../Return';

export default class condSwitchCase extends Instruccion {
  private instrucciones: Instruccion[];
  constructor(fila: Number, columna: Number, instrucciones: Instruccion[]) {
    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.instrucciones = instrucciones;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    let nuevaTabla = new tablaSimbolos(tabla);
    for (let i = 0; i < this.instrucciones.length; i++) {
      let a = this.instrucciones[i].interpretar(arbol, nuevaTabla);
      if (a instanceof Errores) {
        listaErrores.push(a);
        arbol.actualizaConsola((<Errores>a).returnError());
      }
      if (a instanceof Return) return a;
      if (a == 'ByLyContinue') return a;
      if (a == 'ByLy23') return a;
    }
  }
}
