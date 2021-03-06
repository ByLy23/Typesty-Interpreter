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
var reporteTabla_1 = require("../../Reportes/reporteTabla");
var Instruccion_1 = require("../Abastracto/Instruccion");
var nodoAST_1 = __importDefault(require("../Abastracto/nodoAST"));
var Errores_1 = __importDefault(require("../Excepciones/Errores"));
var Simbolo_1 = __importDefault(require("../Simbolos/Simbolo"));
var Tipo_1 = require("../Simbolos/Tipo");
var cambiarTipo_1 = __importDefault(require("../../Reportes/cambiarTipo"));
var Declaracion = /** @class */ (function (_super) {
    __extends(Declaracion, _super);
    function Declaracion(tipo, fila, columna, id, valor) {
        var _this = _super.call(this, tipo, fila, columna) || this;
        _this.tipo = tipo;
        _this.identificador = id;
        _this.valor = valor;
        return _this;
    }
    Declaracion.prototype.getNodo = function () {
        var nodo = new nodoAST_1.default('DECLARACION');
        nodo.agregarHijo(cambiarTipo_1.default(this.tipo.getTipo()) + '');
        nodo.agregarHijo(this.identificador);
        if (this.valor != undefined) {
            nodo.agregarHijo('=');
            nodo.agregarHijoAST(this.valor.getNodo());
        }
        nodo.agregarHijo(';');
        return nodo;
    };
    Declaracion.prototype.interpretar = function (arbol, tabla) {
        if (this.valor === undefined) {
            switch (this.tipo.getTipo()) {
                case Tipo_1.tipoDato.ENTERO:
                    if (tabla.setVariable(new Simbolo_1.default(this.tipo, this.identificador, 0)) ==
                        'La variable existe actualmente') {
                        return new Errores_1.default('SEMANTICO', 'LA VARIABLE ' + this.identificador + ' EXISTE ACTUALMENTE', this.fila, this.columna);
                    }
                    else {
                        if (!arbol.actualizarTabla(this.identificador, '0', this.fila.toString(), tabla.getNombre().toString(), this.columna.toString())) {
                            var nuevoSimbolo = new reporteTabla_1.reporteTabla(this.identificador, '0', 'Variable', cambiarTipo_1.default(this.tipo.getTipo()) + '', tabla.getNombre(), this.fila.toString(), this.columna.toString());
                            arbol.listaSimbolos.push(nuevoSimbolo);
                        }
                    }
                    break;
                case Tipo_1.tipoDato.DECIMAL:
                    if (tabla.setVariable(new Simbolo_1.default(this.tipo, this.identificador, 0.0)) == 'La variable existe actualmente') {
                        return new Errores_1.default('SEMANTICO', 'LA VARIABLE ' + this.identificador + ' EXISTE ACTUALMENTE', this.fila, this.columna);
                    }
                    else {
                        if (!arbol.actualizarTabla(this.identificador, '0.0', this.fila.toString(), tabla.getNombre().toString(), this.columna.toString())) {
                            var nuevoSimbolo = new reporteTabla_1.reporteTabla(this.identificador, '0.0', 'Variable', cambiarTipo_1.default(this.tipo.getTipo()) + '', tabla.getNombre(), this.fila.toString(), this.columna.toString());
                            arbol.listaSimbolos.push(nuevoSimbolo);
                        }
                    }
                    break;
                case Tipo_1.tipoDato.CARACTER:
                    if (tabla.setVariable(new Simbolo_1.default(this.tipo, this.identificador, '\u0000')) == 'La variable existe actualmente') {
                        return new Errores_1.default('SEMANTICO', 'LA VARIABLE ' + this.identificador + ' EXISTE ACTUALMENTE', this.fila, this.columna);
                    }
                    else {
                        if (!arbol.actualizarTabla(this.identificador, '\u0000', this.fila.toString(), tabla.getNombre().toString(), this.columna.toString())) {
                            var nuevoSimbolo = new reporteTabla_1.reporteTabla(this.identificador, '\u0000', 'Variable', cambiarTipo_1.default(this.tipo.getTipo()) + '', tabla.getNombre(), this.fila.toString(), this.columna.toString());
                            arbol.listaSimbolos.push(nuevoSimbolo);
                        }
                    }
                    break;
                case Tipo_1.tipoDato.CADENA:
                    if (tabla.setVariable(new Simbolo_1.default(this.tipo, this.identificador, '')) ==
                        'La variable existe actualmente') {
                        return new Errores_1.default('SEMANTICO', 'LA VARIABLE ' + this.identificador + ' EXISTE ACTUALMENTE', this.fila, this.columna);
                    }
                    else {
                        if (!arbol.actualizarTabla(this.identificador, '', this.fila.toString(), tabla.getNombre().toString(), this.columna.toString())) {
                            var nuevoSimbolo = new reporteTabla_1.reporteTabla(this.identificador, '', 'Variable', cambiarTipo_1.default(this.tipo.getTipo()) + '', tabla.getNombre(), this.fila.toString(), this.columna.toString());
                            arbol.listaSimbolos.push(nuevoSimbolo);
                        }
                    }
                    break;
                case Tipo_1.tipoDato.BOOLEANO:
                    if (tabla.setVariable(new Simbolo_1.default(this.tipo, this.identificador, true)) == 'La variable existe actualmente') {
                        return new Errores_1.default('SEMANTICO', 'LA VARIABLE ' + this.identificador + ' EXISTE ACTUALMENTE', this.fila, this.columna);
                    }
                    else {
                        if (!arbol.actualizarTabla(this.identificador, 'true', this.fila.toString(), tabla.getNombre().toString(), this.columna.toString())) {
                            var nuevoSimbolo = new reporteTabla_1.reporteTabla(this.identificador, 'true', 'Variable', cambiarTipo_1.default(this.tipo.getTipo()) + '', tabla.getNombre(), this.fila.toString(), this.columna.toString());
                            arbol.listaSimbolos.push(nuevoSimbolo);
                        }
                    }
                    break;
            }
        }
        else {
            var val = this.valor.interpretar(arbol, tabla);
            if (this.tipo.getTipo() != this.valor.tipoDato.getTipo()) {
                return new Errores_1.default('SEMANTICO', 'TIPO DE VALOR DIFERENTE', this.fila, this.columna);
            }
            else {
                if (tabla.setVariable(new Simbolo_1.default(this.tipo, this.identificador, val)) ==
                    'La variable existe actualmente') {
                    return new Errores_1.default('SEMANTICO', 'LA VARIABLE ' + this.identificador + ' EXISTE ACTUALMENTE', this.fila, this.columna);
                }
                else {
                    if (!arbol.actualizarTabla(this.identificador, val, this.fila.toString(), tabla.getNombre().toString(), this.columna.toString())) {
                        var nuevoSimbolo = new reporteTabla_1.reporteTabla(this.identificador, val, 'Variable', cambiarTipo_1.default(this.tipo.getTipo()) + '', tabla.getNombre(), this.fila.toString(), this.columna.toString());
                        arbol.listaSimbolos.push(nuevoSimbolo);
                    }
                }
            }
        }
    };
    return Declaracion;
}(Instruccion_1.Instruccion));
exports.default = Declaracion;
