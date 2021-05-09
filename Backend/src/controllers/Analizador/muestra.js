const imprimir = require('./Instrucciones/print');

new imprimir.default(valor, fila, columan);

const nativo = require('./Expresiones/Nativo');

new nativo.default();

const errores = require('./Excepciones/Errores');

new errores.default(tipo, desc, fila, columna);

const inicio = require('../indexControllers');

inicio.listaErrores.push(new errores.default());

const aritmeticas = require('./Expresiones/Aritmetica');
const Tipo = require('./Simbolos/Tipo');

new aritmeticas.default(operador, fila, colu, iop1);

aritmeticas.Operadores.MODULADOR;

new Tipo.default(Tipo.tipoDato.ENTERO);

const relacional = require('./Expresiones/Relacional');

new relacional.default(relacional.Relacionales.MAYOR, fila, columna, $1, $2);

const logicas = require('./Expresiones/Logica');

new logicas.default(logicas.Logicas.AND, fila, columna, con1, con2);

const declaracion = require('./Instrucciones/Declaracion');

new declaracion.default(tipo, fila, colu, id, valor);

const identificador = require('./Expresiones/Identificador');

new identificador.default(strngo, fila, co);

const asignacion = require('./Instrucciones/Asignacion');

new asignacion.default(identificador, valor, fila, col);

const condIf = require('./Instrucciones/Condicionales/condIf');

new condIf.default(fila, columna, con1, condif, cond2, condel);

const condWhile = require('./Instrucciones/Ciclicas/condWhile');

new condWhile.default(condicion, expresion, fila, columna);

const condDoWhile = require('./Instrucciones/Ciclicas/condDoWhile');

new condDoWhile.default(condicion, expresion, fila, columna);

const condTernario = require('./Instrucciones/Condicionales/condIfTernario');

new condTernario.default(cond, is, lse, fila, col);

const condBreak = require('./Instrucciones/Break');

new condBreak.default(fila, columna);

const condSwitch = require('./Instrucciones/Condicionales/condSwitch');

new condSwitch.default(fla, col, ex, lisc, defa);

const condCase = require('./Instrucciones/Condicionales/condSwitchCase');

new condCase.default(fila, columna, expresion, instruccion);

const condDefault = require('./Instrucciones/Condicionales/condSwitchDefault');

new condDefault.default(fila, columna, instrucc);

const Incremento = require('./Instrucciones/Incremento');

new Incremento.default(identificador, valor, fila, columna);

const condFor = require('./Instrucciones/Ciclicas/condFor');

new condFor.default(declasi, cond, act, inst, fila, col);

const metodos = require('./Instrucciones/Metodos');

new metodos.default(tipoDatos, fila, col, id, par, inst);

const llamadas = require('./Instrucciones/LlamadaFuncMetd');

new llamadas.default(ide, par, fila, col);

const ejecucion = require('./Instrucciones/Exec');

const funciones = require('./Instrucciones/Funciones');

new funciones.default(tipo, fila, col, id, par, ins);

const vectores = require('./Instrucciones/declaracionVectores');

const listas = require('./Instrucciones/declaracionListas');

new listas.default(tipo, ide, fila, col, tipoV);

new vectores.default(tipo, id, tipo, fila, col, cant, vec, lis);

const accesoVector = require('./Instrucciones/accesoVector');

new accesoVector.default(ide, exp, fia, com);

const modiVector = require('./Instrucciones/asignacionVector');

new modiVector.default(ide, pos, exp, fila, co);

const accesoLista = require('./Instrucciones/accesoLista');

new accesoLista.default(ide, exp, fia, com);

const modiLista = require('./Instrucciones/asignacionLista');

new modiLista.default(ide, pos, exp, fila, co);

const agregarLista = require('./Instrucciones/agregarLista');

new agregarLista.default(ide, exp, fila, col);

const funcNativa = require('./Instrucciones/funcNativa');

new funcNativa.default(ide, exp, fila, col);

const casteo = require('./Instrucciones/casteo');

new casteo.default(tipo, exp, fila, col);
