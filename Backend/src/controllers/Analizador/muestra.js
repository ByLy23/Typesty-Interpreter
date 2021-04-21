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
