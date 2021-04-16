"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errores = /** @class */ (function () {
    function Errores(tipo, desc, fila, columna) {
        this.tipoError = tipo;
        this.desc = desc;
        this.fila = fila;
        this.columna = columna;
    }
    Errores.prototype.getDesc = function () {
        return this.desc;
    };
    Errores.prototype.getTipoError = function () {
        return this.tipoError;
    };
    Errores.prototype.getcolumna = function () {
        return this.columna;
    };
    Errores.prototype.getFila = function () {
        return this.fila;
    };
    Errores.prototype.returnError = function () {
        return ("Se obtuvo: " +
            this.tipoError +
            " desc:{" +
            this.desc +
            "} en la fila: " +
            this.fila +
            " en la columna: " +
            this.columna +
            "\n");
    };
    return Errores;
}());
exports.default = Errores;
