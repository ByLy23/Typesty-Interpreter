const imprimir = require("./Instrucciones/print");

new imprimir.default(valor, fila, columan);

const nativo = require("./Expresiones/Nativo");

new nativo.default();

const errores = require("./Excepciones/Errores");

new errores.default(tipo, desc, fila, columna);

const inicio = require("../indexControllers");

inicio.listaErrores.push(new errores.default());

const aritmeticas = require("./Expresiones/Aritmetica");
const Tipo = require("./Simbolos/Tipo");

new aritmeticas.default(operador, fila, colu, iop1);

aritmeticas.Operadores.MODULADOR;

new Tipo.default(Tipo.tipoDato.ENTERO);

const relacional = require("./Expresiones/Relacional");

new relacional.default(relacional.Relacionales.MAYOR, fila, columna, $1, $2);

const logicas = require("./Expresiones/Logica");

new logicas.default(logicas.Logicas.AND, fila, columna, con1, con2);

const declaracion = require("./Instrucciones/Declaracion");

new declaracion.default(tipo, fila, colu, id, valor);

const identificador = require("./Expresiones/Identificador");

new identificador.default(strngo, fila, co);

const asignacion = require("./Instrucciones/Asignacion");

new asignacion.default(identificador, valor, fila, col);

const condIf = require("./Instrucciones/Condicionales/condIf");

new condIf.default(fila, columna, con1, condif, cond2, condel);

const condWhile = require("./Instrucciones/Ciclicas/condWhile");

new condWhile.default(condicion, expresion, fila, columna);
