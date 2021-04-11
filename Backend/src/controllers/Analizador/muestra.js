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
