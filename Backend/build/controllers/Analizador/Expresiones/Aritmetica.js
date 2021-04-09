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
exports.Operadores = void 0;
var Instruccion_1 = require("../Abastracto/Instruccion");
var Errores_1 = __importDefault(require("../Excepciones/Errores"));
var Tipo_1 = __importStar(require("../Simbolos/Tipo"));
var Aritmetica = /** @class */ (function (_super) {
    __extends(Aritmetica, _super);
    function Aritmetica(operador, fila, columna, op1, op2) {
        var _this = _super.call(this, new Tipo_1.default(Tipo_1.tipoDato.ENTERO), fila, columna) || this;
        _this.operador = operador;
        if (!op2)
            _this.operandoUnico = _this.operando1;
        else {
            _this.operando1 = op1;
            _this.operando2 = op2;
        }
        return _this;
    }
    Aritmetica.prototype.interpretar = function (arbol, tabla) {
        var _a, _b;
        var izq, der, uno;
        izq = der = uno = null;
        if (this.operandoUnico != null) {
            uno = this.operandoUnico.interpretar(arbol, tabla);
            if (uno instanceof Errores_1.default)
                return uno;
        }
        else {
            izq = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.interpretar(arbol, tabla);
            if (izq instanceof Errores_1.default)
                return izq;
            der = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.interpretar(arbol, tabla);
            if (der instanceof Errores_1.default)
                return der;
        }
        switch (this.operador) {
            case Operadores.SUMA:
                return this.operador1Suma(izq, der);
            case Operadores.RESTA:
                console.log("ACA LLEGA LA RESTA WIIII");
                break;
            case Operadores.MULTIPLICACION:
                console.log("ACA LLEGA LA MULTI WIIII");
                break;
            case Operadores.DIVISION:
                console.log("ACA LLEGA LA DIVISION WIIII");
                break;
            default:
                return new Errores_1.default("ERROR SEMANTICO", "OPERADOR INVALIDO", this.fila, this.columna);
        }
    };
    Aritmetica.prototype.operador1Suma = function (izq, der) {
        var _a, _b;
        var op1 = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        var op2 = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (op1) { //operador 1
            case Tipo_1.tipoDato.ENTERO:
                return this.op2Suma(1, op2, izq, der);
            case Tipo_1.tipoDato.DECIMAL:
                return this.op2Suma(2, op2, izq, der);
            case Tipo_1.tipoDato.BOOLEANO:
                return this.op2Suma(3, op2, izq, der);
            case Tipo_1.tipoDato.CADENA:
                return this.op2Suma(4, op2, izq, der);
            case Tipo_1.tipoDato.CARACTER:
                return this.op2Suma(5, op2, izq, der);
        }
    };
    Aritmetica.prototype.op2Suma = function (numero, op2, izq, der) {
        if (numero == 1) { //entero
            switch (op2) { //OPERADOR 2
                case Tipo_1.tipoDato.ENTERO: //retorna entero
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                    return parseInt(izq) + parseInt(der);
                case Tipo_1.tipoDato.DECIMAL: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    return parseFloat(izq) + parseFloat(der);
                case Tipo_1.tipoDato.BOOLEANO: //retorna entero
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                    if (der == "true")
                        return parseInt(izq) + 1;
                    return parseInt(izq);
                case Tipo_1.tipoDato.CADENA: //retorna cadena
                    return izq + "" + der;
                case Tipo_1.tipoDato.CARACTER: //retorna entero
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                    var da = der + "";
                    var res = da.charCodeAt(1);
                    return parseInt(izq) + res;
            }
        }
        else if (numero == 2) { //decimal
            switch (op2) { //OPERADOR 2
                case Tipo_1.tipoDato.ENTERO: //retorna decimal
                    break;
                case Tipo_1.tipoDato.DECIMAL: //retorna decimal
                    break;
                case Tipo_1.tipoDato.BOOLEANO: //retorna decimal
                    break;
                case Tipo_1.tipoDato.CADENA: //retorna cadena
                    break;
                case Tipo_1.tipoDato.CARACTER: //retorna decimal
                    break;
            }
        }
        else if (numero == 3) { //boolean
            switch (op2) { //OPERADOR 2
                case Tipo_1.tipoDato.ENTERO: //retorna entero
                    break;
                case Tipo_1.tipoDato.DECIMAL: //retorna decimal
                    break;
                case Tipo_1.tipoDato.CADENA: //retorna cadena
                    break;
                default: //error
                    break;
            }
        }
        else if (numero == 4) { //cadena
            switch (op2) { //OPERADOR 2
                case Tipo_1.tipoDato.ENTERO: //retorna cadena
                    break;
                case Tipo_1.tipoDato.DECIMAL: //retorna cadena
                    break;
                case Tipo_1.tipoDato.BOOLEANO: //retorna cadena
                    break;
                case Tipo_1.tipoDato.CADENA: //retorna cadena
                    break;
                case Tipo_1.tipoDato.CARACTER: //retorna cadena
                    break;
            }
        }
        else if (numero == 5) { //caracter
            switch (op2) { //OPERADOR 2
                case Tipo_1.tipoDato.ENTERO:
                    break;
                case Tipo_1.tipoDato.DECIMAL:
                    break;
                case Tipo_1.tipoDato.CADENA:
                    break;
                case Tipo_1.tipoDato.CARACTER:
                    break;
                default: //error semantico
                    break;
            }
        }
    };
    return Aritmetica;
}(Instruccion_1.Instruccion));
exports.default = Aritmetica;
var Operadores;
(function (Operadores) {
    Operadores[Operadores["SUMA"] = 0] = "SUMA";
    Operadores[Operadores["RESTA"] = 1] = "RESTA";
    Operadores[Operadores["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    Operadores[Operadores["DIVISION"] = 3] = "DIVISION";
    Operadores[Operadores["POTENCIA"] = 4] = "POTENCIA";
    Operadores[Operadores["MODULADOR"] = 5] = "MODULADOR";
    Operadores[Operadores["MENOSNUM"] = 6] = "MENOSNUM";
})(Operadores = exports.Operadores || (exports.Operadores = {}));
