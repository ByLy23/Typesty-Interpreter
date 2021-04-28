"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodoAST = /** @class */ (function () {
    function nodoAST(valor) {
        this.listaNodos = new Array();
        this.valor = valor;
    }
    nodoAST.prototype.agregarHijo = function (val, ambito, operador) {
        if (ambito != undefined) {
            switch (ambito) {
                case 'ar':
                    switch (operador) {
                        case 0:
                            val = '+';
                            break;
                        case 1:
                            val = '-';
                            break;
                        case 2:
                            val = '*';
                            break;
                        case 3:
                            val = '/';
                            break;
                        case 4:
                            val = '^';
                            break;
                        case 5:
                            val = '%';
                            break;
                    }
                    break;
                case 'log':
                    switch (operador) {
                        case 0:
                            val = '||';
                            break;
                        case 1:
                            val = '&&';
                            break;
                        case 2:
                            val = '!';
                            break;
                    }
                    break;
                case 'rel':
                    switch (operador) {
                        case 0:
                            val = '==';
                            break;
                        case 1:
                            val = '!=';
                            break;
                        case 2:
                            val = '>';
                            break;
                        case 3:
                            val = '<';
                            break;
                        case 4:
                            val = '>=';
                            break;
                        case 5:
                            val = '<=';
                            break;
                    }
                    break;
            }
            this.listaNodos.push(new nodoAST(val));
        }
        else
            this.listaNodos.push(new nodoAST(val));
    };
    nodoAST.prototype.agregarHijoAST = function (hijo) {
        if (hijo != undefined)
            this.listaNodos.push(hijo);
    };
    nodoAST.prototype.getValor = function () {
        return this.valor;
    };
    nodoAST.prototype.getHijos = function () {
        return this.listaNodos;
    };
    return nodoAST;
}());
exports.default = nodoAST;
