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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Instruccion_1 = require("../Abastracto/Instruccion");
var nodoAST_1 = __importDefault(require("../Abastracto/nodoAST"));
var Errores_1 = __importDefault(require("../Excepciones/Errores"));
var Tipo_1 = __importStar(require("../Simbolos/Tipo"));
var Print = /** @class */ (function (_super) {
    __extends(Print, _super);
    function Print(expresion, fila, columna) {
        var _this = _super.call(this, new Tipo_1.default(Tipo_1.tipoDato.CADENA), fila, columna) || this;
        _this.expresion = expresion;
        return _this;
    }
    Print.prototype.getNodo = function () {
        var nodo = new nodoAST_1.default('IMPRESION');
        nodo.agregarHijo('print');
        nodo.agregarHijo('(');
        nodo.agregarHijoAST(this.expresion.getNodo());
        nodo.agregarHijo(')');
        nodo.agregarHijo(';');
        return nodo;
    };
    Print.prototype.interpretar = function (arbol, tabla) {
        var valor = this.expresion.interpretar(arbol, tabla);
        if (valor instanceof Errores_1.default)
            return valor;
        arbol.actualizaConsola(valor + '');
    };
    return Print;
}(Instruccion_1.Instruccion));
exports.default = Print;
