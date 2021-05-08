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
var Instruccion_1 = require("../Abastracto/Instruccion");
var nodoAST_1 = __importDefault(require("../Abastracto/nodoAST"));
var Errores_1 = __importDefault(require("../Excepciones/Errores"));
var Return_1 = __importDefault(require("./Return"));
var Metodos = /** @class */ (function (_super) {
    __extends(Metodos, _super);
    function Metodos(tipo, fila, columna, identificador, parametros, instrucciones) {
        var _this = _super.call(this, tipo, fila, columna) || this;
        _this.identificador = identificador.toLowerCase();
        _this.parametros = parametros;
        _this.instrucciones = instrucciones;
        return _this;
    }
    Metodos.prototype.getNodo = function () {
        var nodo = new nodoAST_1.default('METODO');
        nodo.agregarHijo('void');
        nodo.agregarHijo(this.identificador + '');
        nodo.agregarHijo('(');
        var nuevo = null;
        if (this.parametros.length > 0) {
            nuevo = new nodoAST_1.default('PARAMETROS');
        }
        for (var param = 0; param < this.parametros.length; param++) {
            if (nuevo == null)
                break;
            var vari = cambiarTipo_1.default(this.parametros[param].tipato.getTipo());
            var ide = this.parametros[param].identificador;
            if (vari != null)
                nuevo.agregarHijo(vari);
            if (ide != null)
                nuevo.agregarHijo(ide);
            if (param != this.parametros.length - 1)
                nuevo.agregarHijo(',');
        }
        if (nuevo != null)
            nodo.agregarHijoAST(nuevo);
        nodo.agregarHijo(')');
        nodo.agregarHijo('{');
        this.instrucciones.forEach(function (element) {
            nodo.agregarHijoAST(element.getNodo());
        });
        nodo.agregarHijo('}');
        return nodo;
    };
    Metodos.prototype.interpretar = function (arbol, tabla) {
        for (var i = 0; i < this.instrucciones.length; i++) {
            var val = this.instrucciones[i].interpretar(arbol, tabla);
            if (val instanceof Errores_1.default)
                return val;
            if (this.instrucciones[i] instanceof Return_1.default) {
                if (val instanceof Return_1.default) {
                    if (val.valor != null) {
                        return new Errores_1.default('SEMANTICO', 'NO PUEDE DEVOLVER UN VALOR EN UN METODO', this.fila, this.columna);
                    }
                    else
                        break;
                }
                else
                    return new Errores_1.default('SEMANTICO', 'NO PUEDE DEVOLVER UN VALOR EN UN METODO', this.fila, this.columna);
            }
        }
    };
    return Metodos;
}(Instruccion_1.Instruccion));
exports.default = Metodos;
