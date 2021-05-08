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
var cambiarTipo_1 = __importDefault(require("../../Reportes/cambiarTipo"));
var Instruccion_1 = require("../Abastracto/Instruccion");
var nodoAST_1 = __importDefault(require("../Abastracto/nodoAST"));
var Errores_1 = __importDefault(require("../Excepciones/Errores"));
var Identificador_1 = __importDefault(require("../Expresiones/Identificador"));
var Tipo_1 = __importStar(require("../Simbolos/Tipo"));
var funcNativa = /** @class */ (function (_super) {
    __extends(funcNativa, _super);
    function funcNativa(identificador, expresion, fila, columna) {
        var _this = _super.call(this, new Tipo_1.default(Tipo_1.tipoDato.ENTERO), fila, columna) || this;
        _this.identificador = identificador.toLowerCase();
        _this.expresion = expresion;
        if (expresion instanceof Identificador_1.default)
            _this.ide = expresion.identificador.toString();
        else
            _this.ide = '';
        return _this;
    }
    funcNativa.prototype.getNodo = function () {
        var nodo = new nodoAST_1.default('FUNCION-NATIVA');
        return nodo;
    };
    funcNativa.prototype.interpretar = function (arbol, tabla) {
        var exp = this.expresion.interpretar(arbol, tabla);
        if (exp instanceof Errores_1.default)
            return exp;
        switch (this.identificador) {
            case 'tolower':
                if (this.expresion.tipoDato.getTipo() != Tipo_1.tipoDato.CADENA)
                    return new Errores_1.default('SEMANTICO', 'TIPO DE DATO INCOMPATIBLE CON FUNCION TOLOWER', this.fila, this.columna);
                this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                return exp.toString().toLowerCase();
            case 'toupper':
                if (this.expresion.tipoDato.getTipo() != Tipo_1.tipoDato.CADENA)
                    return new Errores_1.default('SEMANTICO', 'TIPO DE DATO INCOMPATIBLE CON FUNCION TOUPPER', this.fila, this.columna);
                this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                return exp.toString().toUpperCase();
            case 'length':
                this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                var vec = arbol.BuscarTipo(this.ide);
                if (vec == 'lista' || vec == 'vector')
                    return exp.length;
                else if (this.expresion.tipoDato.getTipo() == Tipo_1.tipoDato.CADENA)
                    return exp.length;
                else
                    return new Errores_1.default('SEMANTICO', 'TIPO DE DATO INCOMPATIBLE CON FUNCION LENGTH', this.fila, this.columna);
            case 'truncate':
                this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                if (this.expresion.tipoDato.getTipo() == Tipo_1.tipoDato.DECIMAL ||
                    this.expresion.tipoDato.getTipo() == Tipo_1.tipoDato.ENTERO)
                    return Math.trunc(parseFloat(exp));
                else
                    return new Errores_1.default('SEMANTICO', 'TIPO DE DATO INCOMPATIBLE CON FUNCION TRUNCATE', this.fila, this.columna);
            case 'round':
                this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                if (this.expresion.tipoDato.getTipo() == Tipo_1.tipoDato.DECIMAL ||
                    this.expresion.tipoDato.getTipo() == Tipo_1.tipoDato.ENTERO)
                    return Math.round(parseFloat(exp));
                else
                    return new Errores_1.default('SEMANTICO', 'TIPO DE DATO INCOMPATIBLE CON FUNCION ROUND', this.fila, this.columna);
            case 'typeof':
                this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                var tipo = arbol.BuscarTipo(this.ide);
                if (tipo == 'lista' || tipo == 'vector')
                    return tipo.toString();
                else
                    return cambiarTipo_1.default(this.expresion.tipoDato.getTipo());
            case 'tostring':
                this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                if (this.expresion.tipoDato.getTipo() == Tipo_1.tipoDato.DECIMAL ||
                    this.expresion.tipoDato.getTipo() == Tipo_1.tipoDato.ENTERO ||
                    this.expresion.tipoDato.getTipo() == Tipo_1.tipoDato.BOOLEANO ||
                    this.expresion.tipoDato.getTipo() == Tipo_1.tipoDato.CARACTER)
                    return exp.toString();
                else
                    return new Errores_1.default('SEMANTICO', 'TIPO DE DATO INCOMPATIBLE CON FUNCION TOSTRING', this.fila, this.columna);
            case 'tochararray':
                this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CARACTER);
                if (this.expresion.tipoDato.getTipo() == Tipo_1.tipoDato.CADENA) {
                    var arreglo = [];
                    var cadena = exp.toString();
                    for (var i = 0; i < cadena.length; i++) {
                        arreglo.push(cadena[i]);
                    }
                    return arreglo;
                }
                else
                    return new Errores_1.default('SEMANTICO', 'TIPO DE DATO INCOMPATIBLE CON FUNCION TOCHARARRAY', this.fila, this.columna);
            default:
                return new Errores_1.default('SEMANTICO', 'TIPO DE DATO INCOMPATIBLE CON FUNCION NATIVA', this.fila, this.columna);
        }
    };
    return funcNativa;
}(Instruccion_1.Instruccion));
exports.default = funcNativa;
/*
toString
    numerico, booleano y caracter
    retorna string
tocharArray
    cadena en lista de caracteres
    retorna lista
*/
