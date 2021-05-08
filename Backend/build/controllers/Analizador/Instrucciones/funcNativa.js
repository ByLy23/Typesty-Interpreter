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
var Tipo_1 = __importStar(require("../Simbolos/Tipo"));
var funcNativa = /** @class */ (function (_super) {
    __extends(funcNativa, _super);
    function funcNativa(identificador, expresion, fila, columna) {
        var _this = _super.call(this, new Tipo_1.default(Tipo_1.tipoDato.ENTERO), fila, columna) || this;
        _this.identificador = identificador.toLowerCase();
        _this.expresion = expresion;
        return _this;
    }
    funcNativa.prototype.getNodo = function () {
        var nodo = new nodoAST_1.default('FUNCION-NATIVA');
        return nodo;
    };
    funcNativa.prototype.interpretar = function (arbol, tabla) {
        console.log(this.identificador + " " + this.expresion);
        switch (this.identificador) {
            case 'tolower':
                this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                return '';
            case 'toupper':
                this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                return '';
            case 'length':
                this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                break;
            case 'truncate':
                this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                break;
            case 'round':
                this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                break;
            case 'typeof':
                this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                break;
            case 'tostring':
                this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                break;
            case 'tochararray':
                //this.tipoDato = new Tipo(tipoDato.CADENA); RETORNA EL TIPO DE DATO QUE TENGA EL IDENTIFICADOR
                break;
        }
    };
    return funcNativa;
}(Instruccion_1.Instruccion));
exports.default = funcNativa;
/*
toupper
    cadena
    retorna cadena
tolower
    cadena
    retorna cadena
length
    vector, lista, cadena
    retorna entero
truncate
    double, entero
    retorna entero
round
    double >=0.5 o <0.5
    retorna entero
typeof
    tipoDato
    retorna string
    si es no que vaya a buscar en la lista con el metodo buscartipo para ver si es vector o lista
toString
    numerico, booleano y caracter
    retorna string
tocharArray
    cadena en lista de caracteres
    retorna lista
*/
