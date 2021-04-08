const imprimir= require('./Instrucciones/print');


new imprimir.default(valor,fila,columan)

const nativo= require('./Expresiones/Nativo');

new nativo.default(valor, fila, columna)

const errores= require('./Excepciones/Errores');

new errores.default(tipo, desc, fila, columna)

const inicio= require('../indexControllers');

inicio.listaErrores.push(new errores.default)