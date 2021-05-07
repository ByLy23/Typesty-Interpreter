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
var Tipo_1 = require("../Simbolos/Tipo");
var declaracionVectores = /** @class */ (function (_super) {
    __extends(declaracionVectores, _super);
    function declaracionVectores(tipo, identificador, tipoDeclaracion, fila, columna, cantidad, tipoVector, listaValores) {
        var _this = _super.call(this, tipo, fila, columna) || this;
        _this.tipo = tipo;
        _this.identificador = identificador;
        _this.tipoDeclaracion = tipoDeclaracion;
        _this.cantidad = cantidad;
        _this.tipoVector = tipoVector;
        _this.listaValores = listaValores;
        return _this;
    }
    declaracionVectores.prototype.getNodo = function () {
        var _a, _b;
        var nodo = new nodoAST_1.default('VECTORES');
        nodo.agregarHijo(cambiarTipo_1.default(this.tipo.getTipo()) + '');
        nodo.agregarHijo('[');
        nodo.agregarHijo(']');
        nodo.agregarHijo(this.identificador);
        nodo.agregarHijo('=');
        if (this.tipoDeclaracion) {
            nodo.agregarHijo('[');
            nodo.agregarHijoAST((_a = this.cantidad) === null || _a === void 0 ? void 0 : _a.getNodo());
            nodo.agregarHijo(']');
        }
        else {
            nodo.agregarHijo('{');
            (_b = this.listaValores) === null || _b === void 0 ? void 0 : _b.forEach(function (res) {
                nodo.agregarHijoAST(res.getNodo());
                nodo.agregarHijo(',');
            });
            nodo.agregarHijo('}');
        }
        nodo.agregarHijo(';');
        return nodo;
    };
    declaracionVectores.prototype.interpretar = function (arbol, tabla) {
        var _a, _b, _c;
        if (this.tipoDeclaracion) {
            if (this.tipoVector == null)
                return new Errores_1.default('SINTACTICO', 'NO EXISTE TIPO DE DATO DE VECTOR', this.fila, this.columna);
            if (this.tipo.getTipo() != ((_a = this.tipoVector) === null || _a === void 0 ? void 0 : _a.getTipo()))
                return new Errores_1.default('SEMANTICO', 'TIPOS DE DATOS DIFERENTES EN DECLARACION', this.fila, this.columna);
            else {
                var numero = (_b = this.cantidad) === null || _b === void 0 ? void 0 : _b.interpretar(arbol, tabla);
                if (numero instanceof Errores_1.default)
                    return numero;
                if (((_c = this.cantidad) === null || _c === void 0 ? void 0 : _c.tipoDato.getTipo()) != Tipo_1.tipoDato.ENTERO)
                    return new Errores_1.default('SEMANTICO', 'VARIABLE NO ES TIPO ENTERO', this.fila, this.columna);
                var num = parseInt(numero);
                var arreglo = [];
                for (var i = 0; i < num; i++) {
                    arreglo[i] = [];
                }
                if (tabla.setVariable(new Simbolo_1.default(this.tipo, this.identificador, arreglo)) == 'La variable existe actualmente')
                    return new Errores_1.default('SEMANTICO', 'LA VARIABLE ' + this.identificador + ' EXISTE ACTUALMENTE', this.fila, this.columna);
                else {
                    if (!arbol.actualizarTabla(this.identificador, arreglo, this.fila.toString(), tabla.getNombre().toString(), this.columna.toString())) {
                        var nuevoSimbolo = new reporteTabla_1.reporteTabla(this.identificador, arreglo, 'Vector', cambiarTipo_1.default(this.tipo.getTipo()) + '', tabla.getNombre(), this.fila.toString(), this.columna.toString());
                        arbol.listaSimbolos.push(nuevoSimbolo);
                    }
                }
            }
        }
        else {
            var arreglo = [];
            if (this.listaValores == null || this.listaValores.length <= 0)
                return new Errores_1.default('SEMANTICO', 'NO TIENE NINGUN VALOR', this.fila, this.columna);
            for (var i = 0; i < this.listaValores.length; i++) {
                var valor = this.listaValores[i].interpretar(arbol, tabla);
                if (valor instanceof Errores_1.default)
                    return valor;
                if (this.tipo.getTipo() != this.listaValores[i].tipoDato.getTipo())
                    return new Errores_1.default('SEMANTICO', 'TIPO DE DATO DIFERENTE', this.fila, this.columna);
                arreglo[i] = valor;
            }
            if (tabla.setVariable(new Simbolo_1.default(this.tipo, this.identificador, arreglo)) == 'La variable existe actualmente')
                return new Errores_1.default('SEMANTICO', 'LA VARIABLE ' + this.identificador + ' EXISTE ACTUALMENTE', this.fila, this.columna);
            else {
                if (!arbol.actualizarTabla(this.identificador, arreglo, this.fila.toString(), tabla.getNombre().toString(), this.columna.toString())) {
                    var nuevoSimbolo = new reporteTabla_1.reporteTabla(this.identificador, arreglo, 'Vector', cambiarTipo_1.default(this.tipo.getTipo()) + '', tabla.getNombre(), this.fila.toString(), this.columna.toString());
                    arbol.listaSimbolos.push(nuevoSimbolo);
                }
            }
            //declaracion tipo 2
        }
    };
    return declaracionVectores;
}(Instruccion_1.Instruccion));
exports.default = declaracionVectores;
