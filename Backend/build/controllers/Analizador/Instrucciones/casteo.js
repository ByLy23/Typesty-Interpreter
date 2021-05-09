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
var Tipo_1 = __importStar(require("../Simbolos/Tipo"));
var casteo = /** @class */ (function (_super) {
    __extends(casteo, _super);
    function casteo(tipo, expresion, fila, columna) {
        var _this = _super.call(this, tipo, fila, columna) || this;
        _this.tipo = tipo;
        _this.expresion = expresion;
        return _this;
    }
    casteo.prototype.getNodo = function () {
        var nodo = new nodoAST_1.default('CASTEO');
        nodo.agregarHijo('(');
        nodo.agregarHijo(cambiarTipo_1.default(this.tipo.getTipo()) + '');
        nodo.agregarHijo(')');
        nodo.agregarHijoAST(this.expresion.getNodo());
        return nodo;
    };
    casteo.prototype.interpretar = function (arbol, tabla) {
        var exp = this.expresion.interpretar(arbol, tabla);
        if (exp instanceof Errores_1.default)
            return exp;
        if (this.tipo.getTipo() == this.expresion.tipoDato.getTipo())
            return new Errores_1.default('SEMANTICO', 'NO SE PUEDE CASTEAR EL MISMO TIPO DE DATO', this.fila, this.columna);
        if (this.expresion.tipoDato.getTipo() == Tipo_1.tipoDato.ENTERO) {
            if (this.tipo.getTipo() == Tipo_1.tipoDato.DECIMAL) {
                this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                return parseFloat(exp);
            }
            else if (this.tipo.getTipo() == Tipo_1.tipoDato.CADENA) {
                this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                return exp.toString();
            }
            else if (this.tipo.getTipo() == Tipo_1.tipoDato.CARACTER) {
                this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CARACTER);
                return String.fromCharCode(parseInt(exp));
            }
            else
                return new Errores_1.default('SEMANTICO', 'NO ES POSIBLE EL CASTEO POR TIPO DE DATO', this.fila, this.columna);
        }
        else if (this.expresion.tipoDato.getTipo() == Tipo_1.tipoDato.DECIMAL) {
            if (this.tipo.getTipo() == Tipo_1.tipoDato.ENTERO) {
                this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                return parseInt(exp);
            }
            else if (this.tipo.getTipo() == Tipo_1.tipoDato.CADENA) {
                this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                return exp.toString();
            }
            else
                return new Errores_1.default('SEMANTICO', 'NO ES POSIBLE EL CASTEO POR TIPO DE DATO', this.fila, this.columna);
        }
        else if (this.expresion.tipoDato.getTipo() == Tipo_1.tipoDato.CARACTER) {
            if (this.tipo.getTipo() == Tipo_1.tipoDato.ENTERO) {
                this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                var da = exp + '';
                var res = da.charCodeAt(0);
                return res;
            }
            else if (this.tipo.getTipo() == Tipo_1.tipoDato.DECIMAL) {
                this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                var da = exp + '';
                var res = da.charCodeAt(0);
                return res;
            }
            else
                return new Errores_1.default('SEMANTICO', 'NO ES POSIBLE EL CASTEO POR TIPO DE DATO', this.fila, this.columna);
        }
        else
            return new Errores_1.default('SEMANTICO', 'NO ES POSIBLE EL CASTEO POR TIPO DE DATO', this.fila, this.columna);
    };
    return casteo;
}(Instruccion_1.Instruccion));
exports.default = casteo;
