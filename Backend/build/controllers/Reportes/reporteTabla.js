"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reporteTabla = void 0;
var reporteTabla = /** @class */ (function () {
    function reporteTabla(identificador, valor, forma, tipo, entorno, linea, columna) {
        this.identificador = identificador;
        this.forma = forma;
        this.tipo = tipo;
        this.entorno = entorno;
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
    }
    reporteTabla.prototype.getIdentificador = function () {
        return this.identificador;
    };
    reporteTabla.prototype.getForma = function () {
        return this.forma;
    };
    reporteTabla.prototype.getTipo = function () {
        return this.tipo;
    };
    reporteTabla.prototype.getEntorno = function () {
        return this.entorno;
    };
    reporteTabla.prototype.getLinea = function () {
        return this.linea;
    };
    reporteTabla.prototype.getColumna = function () {
        return this.columna;
    };
    reporteTabla.prototype.getValor = function () {
        return this.valor;
    };
    reporteTabla.prototype.setLinea = function (linea) {
        this.linea = linea;
    };
    reporteTabla.prototype.setColumna = function (col) {
        this.columna = col;
    };
    reporteTabla.prototype.setValor = function (val) {
        this.valor = val;
    };
    reporteTabla.prototype.setEntorno = function (ent) {
        this.entorno = ent;
    };
    return reporteTabla;
}());
exports.reporteTabla = reporteTabla;
