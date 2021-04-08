"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipoDato = void 0;
var Tipo = /** @class */ (function () {
    function Tipo(tipos) {
        this.tipos = tipos;
    }
    Tipo.prototype.getTipo = function () {
        return this.tipos;
    };
    Tipo.prototype.setTipo = function (tipo) {
        this.tipos = tipo;
    };
    Tipo.prototype.igual = function (compara) {
        return this.tipos = compara.tipos;
    };
    return Tipo;
}());
exports.default = Tipo;
var tipoDato;
(function (tipoDato) {
    tipoDato[tipoDato["ENTERO"] = 0] = "ENTERO";
    tipoDato[tipoDato["DECIMAL"] = 1] = "DECIMAL";
    tipoDato[tipoDato["BOOLEANO"] = 2] = "BOOLEANO";
    tipoDato[tipoDato["CARACTER"] = 3] = "CARACTER";
    tipoDato[tipoDato["CADENA"] = 4] = "CADENA";
})(tipoDato = exports.tipoDato || (exports.tipoDato = {}));
