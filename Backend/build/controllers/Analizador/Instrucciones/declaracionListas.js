"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cambiarTipo_1 = __importDefault(require("../../Reportes/cambiarTipo"));
var reporteTabla_1 = require("../../Reportes/reporteTabla");
var Instruccion_1 = require("../Abastracto/Instruccion");
var nodoAST_1 = __importDefault(require("../Abastracto/nodoAST"));
var Errores_1 = __importDefault(require("../Excepciones/Errores"));
var Simbolo_1 = __importDefault(require("../Simbolos/Simbolo"));
var declaracionListas = /** @class */ (function (_super) {
    __extends(declaracionListas, _super);
    function declaracionListas(tipo, identificador, fila, columna, tipoVector, expresion) {
        var _this = _super.call(this, tipo, fila, columna) || this;
        _this.tipo = tipo;
        _this.identificador = identificador.toLowerCase();
        _this.tipoVector = tipoVector;
        _this.expresion = expresion;
        return _this;
    }
    declaracionListas.prototype.getNodo = function () {
        var _a;
        var nodo = new nodoAST_1.default('LISTAS');
        nodo.agregarHijo('list');
        nodo.agregarHijo('<');
        nodo.agregarHijo(cambiarTipo_1.default(this.tipo.getTipo()) + '');
        nodo.agregarHijo('>');
        nodo.agregarHijo(this.identificador);
        nodo.agregarHijo('=');
        nodo.agregarHijo('new');
        nodo.agregarHijo('list');
        nodo.agregarHijo('<');
        nodo.agregarHijo(cambiarTipo_1.default((_a = this.tipoVector) === null || _a === void 0 ? void 0 : _a.getTipo()) + '');
        nodo.agregarHijo('>');
        nodo.agregarHijo(';');
        return nodo;
    };
    declaracionListas.prototype.interpretar = function (arbol, tabla) {
        var _a, _b;
        if (this.tipoVector != null) {
            if (this.tipo.getTipo() != this.tipoVector.getTipo())
                return new Errores_1.default('SEMANTICO', 'TIPOS DE DATOS DIFERENTES EN DECLARACION', this.fila, this.columna);
            else {
                var arreglo = new Array();
                if (tabla.setVariable(new Simbolo_1.default(this.tipo, this.identificador, arreglo)) == 'La variable existe actualmente')
                    return new Errores_1.default('SEMANTICO', 'LA VARIABLE ' + this.identificador + ' EXISTE ACTUALMENTE', this.fila, this.columna);
                else {
                    if (!arbol.actualizarTabla(this.identificador, arreglo.toString(), this.fila.toString(), tabla.getNombre().toString(), this.columna.toString())) {
                        var nuevoSimbolo = new reporteTabla_1.reporteTabla(this.identificador, arreglo.toString(), 'lista', cambiarTipo_1.default(this.tipo.getTipo()) + '', tabla.getNombre(), this.fila.toString(), this.columna.toString());
                        arbol.listaSimbolos.push(nuevoSimbolo);
                    }
                }
            }
        }
        else {
            var exp = (_a = this.expresion) === null || _a === void 0 ? void 0 : _a.interpretar(arbol, tabla);
            if (exp instanceof Errores_1.default)
                return exp;
            if (this.tipo.getTipo() != ((_b = this.expresion) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo()))
                return new Errores_1.default('SEMANTICO', 'TIPOS DE DATOS DIFERENTES EN DECLARACION', this.fila, this.columna);
            var arreglo = new Array();
            for (var i = 0; i < exp.length; i++) {
                arreglo.push(exp[i]);
            }
            if (tabla.setVariable(new Simbolo_1.default(this.tipo, this.identificador, arreglo)) == 'La variable existe actualmente')
                return new Errores_1.default('SEMANTICO', 'LA VARIABLE ' + this.identificador + ' EXISTE ACTUALMENTE', this.fila, this.columna);
            else {
                if (!arbol.actualizarTabla(this.identificador, arreglo.toString(), this.fila.toString(), tabla.getNombre().toString(), this.columna.toString())) {
                    var nuevoSimbolo = new reporteTabla_1.reporteTabla(this.identificador, arreglo.toString(), 'lista', cambiarTipo_1.default(this.tipo.getTipo()) + '', tabla.getNombre(), this.fila.toString(), this.columna.toString());
                    arbol.listaSimbolos.push(nuevoSimbolo);
                }
            }
        }
    };
    return declaracionListas;
}(Instruccion_1.Instruccion));
exports.default = declaracionListas;
