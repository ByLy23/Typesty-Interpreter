import { indexController, listaSimbolos } from '../../indexControllers';
import { reporteTabla } from '../../Reportes/reporteTabla';
import { Instruccion } from '../Abastracto/Instruccion';
import Errores from '../Excepciones/Errores';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolos from '../Simbolos/tablaSimbolos';
import Tipo, { tipoDato } from '../Simbolos/Tipo';

export default class Asignacion extends Instruccion {
  private identificador: string;
  private valor: Instruccion;
  constructor(
    identificador: string,
    valor: Instruccion,
    fila: Number,
    columna: Number
  ) {
    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.identificador = identificador;
    this.valor = valor;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    //tomar el tipoDato de la variable
    let variable = tabla.getVariable(this.identificador);
    if (variable != null) {
      let val = this.valor.interpretar(arbol, tabla);
      if (variable.gettipo().getTipo() != this.valor.tipoDato.getTipo()) {
        return new Errores(
          'SEMANTICO',
          'VARIABLE ' + this.identificador + ' TIPOS DE DATOS DIFERENTES',
          this.fila,
          this.columna
        );
      } else {
        variable.setvalor(val);
        indexController.actualizarTabla(
          this.identificador,
          variable.getvalor(),
          this.fila.toString(),
          this.columna.toString()
        );
        //identificadorm,
        //actualizar valor de la tabla y no crear otra equis des
      }
    } else {
      return new Errores(
        'SEMANTICO',
        'VARIABLE ' + this.identificador + ' NO EXISTE',
        this.fila,
        this.columna
      );
    }
  }
}
