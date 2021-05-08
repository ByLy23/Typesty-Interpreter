"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tablaSimbolos_1 = __importDefault(require("./tablaSimbolos"));
var Metodos_1 = __importDefault(require("../Instrucciones/Metodos"));
var Funciones_1 = __importDefault(require("../Instrucciones/Funciones"));
var reporteTabla_1 = require("../../Reportes/reporteTabla");
var cambiarTipo_1 = __importDefault(require("../../Reportes/cambiarTipo"));
var Arbol = /** @class */ (function () {
    function Arbol(instrucciones) {
        this.consola = '';
        this.instrucciones = instrucciones;
        this.consola = '';
        this.tablaGlobal = new tablaSimbolos_1.default();
        this.errores = new Array();
        this.funciones = new Array();
        this.listaSimbolos = new Array();
    }
    Arbol.prototype.getSimbolos = function () {
        return this.listaSimbolos;
    };
    Arbol.prototype.actualizarTabla = function (identificador, valor, linea, entorno, columna) {
        for (var _i = 0, _a = this.listaSimbolos; _i < _a.length; _i++) {
            var elemento = _a[_i];
            if (elemento.getIdentificador().toString() == identificador.toLowerCase() &&
                elemento.getEntorno().toString() == entorno.toString()) {
                elemento.setValor(valor);
                elemento.setLinea(linea);
                elemento.setColumna(columna);
                return true;
            }
        }
        return false;
    };
    Arbol.prototype.BuscarTipo = function (identificador) {
        for (var _i = 0, _a = this.listaSimbolos; _i < _a.length; _i++) {
            var elemento = _a[_i];
            if (elemento.getIdentificador() == identificador.toLowerCase()) {
                return elemento.getForma().toString();
            }
        }
        return 'as';
    };
    Arbol.prototype.getFuncion = function (identificador) {
        for (var _i = 0, _a = this.funciones; _i < _a.length; _i++) {
            var f = _a[_i];
            if (f instanceof Metodos_1.default) {
                if (identificador.toLowerCase() ==
                    f.identificador.toLowerCase()) {
                    if (!this.actualizarTabla(f.identificador.toString(), '', f.fila.toString(), '', f.columna.toString())) {
                        var nuevoSimbolo = new reporteTabla_1.reporteTabla(f.identificador, '', 'MetodoCreacion', 'void', '', f.fila.toString(), f.columna.toString());
                        this.listaSimbolos.push(nuevoSimbolo);
                    }
                    return f;
                }
            }
            else if (f instanceof Funciones_1.default) {
                if (identificador.toLowerCase() ==
                    f.identificador.toLowerCase()) {
                    if (!this.actualizarTabla(f.identificador.toString(), '', f.fila.toString(), '', f.columna.toString())) {
                        var nuevoSimbolo = new reporteTabla_1.reporteTabla(f.identificador, '', 'FuncionCreacion', cambiarTipo_1.default(f.tipoDato.getTipo()) + '', '', f.fila.toString(), f.columna.toString());
                        this.listaSimbolos.push(nuevoSimbolo);
                    }
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
