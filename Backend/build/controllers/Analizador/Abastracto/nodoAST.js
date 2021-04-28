"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodoAST = /** @class */ (function () {
    function nodoAST(valor) {
        this.listaNodos = new Array();
        this.valor = valor;
    }
    nodoAST.prototype.agregarHijo = function (val) {
        this.listaNodos.push(new nodoAST(val));
    };
    nodoAST.prototype.agregarHijoAST = function (hijo) {
        if (hijo != undefined)
            this.listaNodos.push(hijo);
    };
    return nodoAST;
}());
exports.default = nodoAST;
