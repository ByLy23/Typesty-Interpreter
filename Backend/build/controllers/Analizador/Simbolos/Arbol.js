"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tablaSimbolos_1 = __importDefault(require("./tablaSimbolos"));
var Metodos_1 = __importDefault(require("../Instrucciones/Metodos"));
var Funciones_1 = __importDefault(require("../Instrucciones/Funciones"));
var reporteTabla_1 = require("../../Reportes/reporteTabla");
var indexControllers_1 = require("../../indexControllers");
var cambiarTipo_1 = __importDefault(require("../../reportes/cambiarTipo"));
var Arbol = /** @class */ (function () {
    function Arbol(instrucciones) {
        this.instrucciones = instrucciones;
        this.consola = '';
        this.tablaGlobal = new tablaSimbolos_1.default();
        this.errores = new Array();
        this.funciones = new Array();
    }
    Arbol.prototype.getFuncion = function (identificador) {
        for (var _i = 0, _a = this.funciones; _i < _a.length; _i++) {
            var f = _a[_i];
            if (f instanceof Metodos_1.default) {
                if (identificador.toLowerCase() ==
                    f.identificador.toLowerCase()) {
                    var nuevoSimbolo = new reporteTabla_1.reporteTabla(f.identificador, '', 'Metodo', 'Void', '', f.fila.toString(), f.columna.toString());
                    indexControllers_1.listaSimbolos.push(nuevoSimbolo);
                    return f;
                }
            }
            else if (f instanceof Funciones_1.default) {
                if (identificador.toLowerCase() ==
                    f.identificador.toLowerCase()) {
                    var nuevoSimbolo = new reporteTabla_1.reporteTabla(f.identificador, '', 'Funcion', cambiarTipo_1.default(f.tipoDato.getTipo()) + '', '', f.fila.toString(), f.columna.toString());
                    indexControllers_1.listaSimbolos.push(nuevoSimbolo);
                    return f;
                }
            }
        }
    };
    Arbol.prototype.getfunciones = function () {
        return this.funciones;
    };
    Arbol.prototype.setfunciones = function (value) {
        this.funciones = value;
    };
    Arbol.prototype.geterrores = function () {
        return this.errores;
    };
    Arbol.prototype.seterrores = function (value) {
        this.errores = value;
    };
    Arbol.prototype.getinstrucciones = function () {
        return this.instrucciones;
    };
    Arbol.prototype.setinstrucciones = function (value) {
        this.instrucciones = value;
    };
    Arbol.prototype.getconsola = function () {
        return this.consola;
    };
    Arbol.prototype.setconsola = function (value) {
        this.consola = value;
    };
    Arbol.prototype.actualizaConsola = function (uptodate) {
        this.consola = "" + this.consola + uptodate + "\n";
    };
    Arbol.prototype.gettablaGlobal = function () {
        return this.tablaGlobal;
    };
    Arbol.prototype.settablaGlobal = function (value) {
        this.tablaGlobal = value;
    };
    return Arbol;
}());
exports.default = Arbol;
