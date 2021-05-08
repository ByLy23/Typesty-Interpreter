"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Simbolo = /** @class */ (function () {
    function Simbolo(tipo, identificador, valor) {
        this.tipo = tipo;
        this.identificador = identificador.toLowerCase();
        this.valor = valor;
    }
    //getters y setters
    Simbolo.prototype.gettipo = function () {
        return this.tipo;
    };
    Simbolo.prototype.settipo = function (value) {
        this.tipo = value;
    };
    Simbolo.prototype.getidentificador = function () {
        return this.identificador;
    };
    Simbolo.prototype.setidentificador = function (value) {
        this.identificador = value;
    };
    Simbolo.prototype.getvalor = function () {
        return this.valor;
    };
    Simbolo.prototype.setvalor = function (value) {
        this.valor = value;
    };
    return Simbolo;
}());
exports.default = Simbolo;
