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
var Instruccion_1 = require("../Abastracto/Instruccion");
var nodoAST_1 = __importDefault(require("../Abastracto/nodoAST"));
var Tipo_1 = require("../Simbolos/Tipo");
var Nativo = /** @class */ (function (_super) {
    __extends(Nativo, _super);
    function Nativo(tipo, valor, fila, columna) {
        var _this = _super.call(this, tipo, fila, columna) || this;
        _this.valor = valor;
        if (tipo.getTipo() == Tipo_1.tipoDato.CADENA) {
            var val = _this.valor.toString();
            _this.valor = val
                .replace('\\n', '\n')
                .replace('\\t', '\t')
                .replace('\\r', '\r')
                .replace('\\\\', '\\')
                .replace("\\'", "'")
                .replace('\\"', '"');
        }
        return _this;
    }
    Nativo.prototype.getNodo = function () {
        var nodo = new nodoAST_1.default('NATIVO');
        nodo.agregarHijo(this.valor + '');
        return nodo;
    };
    Nativo.prototype.interpretar = function (arbol, tabla) {
        if (this.tipoDato.getTipo() == Tipo_1.tipoDato.BOOLEANO) {
            return this.valor == 'true' ? true : false;
        }
        return this.valor;
    };
    return Nativo;
}(Instruccion_1.Instruccion));
exports.default = Nativo;
