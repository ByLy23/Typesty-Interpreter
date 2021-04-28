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
var nodoAST_1 = __importDefault(require("../Abastracto/nodoAST"));
var Errores_1 = __importDefault(require("../Excepciones/Errores"));
var Tipo_1 = __importStar(require("../Simbolos/Tipo"));
var Aritmetica = /** @class */ (function (_super) {
    __extends(Aritmetica, _super);
    function Aritmetica(operador, fila, columna, op1, op2) {
        var _this = _super.call(this, new Tipo_1.default(Tipo_1.tipoDato.ENTERO), fila, columna) || this;
        _this.operador = operador;
        if (!op2)
            _this.operandoUnico = op1;
        else {
            _this.operando1 = op1;
            _this.operando2 = op2;
        }
        return _this;
    }
    Aritmetica.prototype.getNodo = function () {
        var _a, _b;
        var nodo = new nodoAST_1.default('ARITMETICA');
        if (this.operandoUnico != null) {
            nodo.agregarHijo(this.operador + '');
            nodo.agregarHijoAST(this.operandoUnico.getNodo());
        }
        else {
            nodo.agregarHijoAST((_a = this.operando1) === null || _a === void 0 ? void 0 : _a.getNodo());
            nodo.agregarHijo(this.operador + '');
            nodo.agregarHijoAST((_b = this.operando2) === null || _b === void 0 ? void 0 : _b.getNodo());
        }
        return nodo;
    };
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
                return this.operador1Resta(izq, der);
            case Operadores.MULTIPLICACION:
                return this.operador1Multi(izq, der);
            case Operadores.DIVISION:
                return this.operador1Division(izq, der);
            case Operadores.POTENCIA:
                return this.operador1Potencia(izq, der);
            case Operadores.MODULADOR:
                return this.operador1Mod(izq, der);
            case Operadores.MENOSNUM:
                return this.opMenosUnario(uno);
            default:
                return new Errores_1.default('ERROR SEMANTICO', 'OPERADOR INVALIDO', this.fila, this.columna);
        }
    };
    /*----------------------------------------------------------MENOSUNARIO------------------------------------------------- */
    Aritmetica.prototype.opMenosUnario = function (izq) {
        var _a;
        var opUn = (_a = this.operandoUnico) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        switch (opUn) {
            case Tipo_1.tipoDato.ENTERO:
                return parseInt(izq) * -1;
            case Tipo_1.tipoDato.DECIMAL:
                return parseFloat(izq) * -1;
        }
    };
    /*----------------------------------------------------------SUMA------------------------------------------------- */
    Aritmetica.prototype.operador1Suma = function (izq, der) {
        var _a, _b;
        var op1 = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        var op2 = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (op1 //operador 1
        ) {
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
        if (numero == 1) {
            //entero
            switch (op2 //OPERADOR 2
            ) {
                case Tipo_1.tipoDato.ENTERO: //retorna entero
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                    return parseInt(izq) + parseInt(der);
                case Tipo_1.tipoDato.DECIMAL: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    return parseFloat(izq) + parseFloat(der);
                case Tipo_1.tipoDato.BOOLEANO: //retorna entero
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                    var dats = der + '';
                    var otr = dats.toLowerCase();
                    return otr == 'true' ? parseInt(izq) + 1 : parseInt(izq);
                case Tipo_1.tipoDato.CADENA: //retorna cadena
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                    return izq + '' + der;
                case Tipo_1.tipoDato.CARACTER: //retorna entero
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                    var da = der + '';
                    var res = da.charCodeAt(0);
                    return parseInt(izq) + res;
            }
        }
        else if (numero == 2) {
            //decimal
            switch (op2 //OPERADOR 2
            ) {
                case Tipo_1.tipoDato.ENTERO: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    return parseFloat(izq) + parseFloat(der);
                case Tipo_1.tipoDato.DECIMAL: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    return parseFloat(izq) + parseFloat(der);
                case Tipo_1.tipoDato.BOOLEANO: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    var dats = der + '';
                    var otr = dats.toLowerCase();
                    return otr == 'true' ? parseFloat(izq) + 1 : parseFloat(izq);
                case Tipo_1.tipoDato.CADENA: //retorna cadena
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                    return izq + '' + der;
                case Tipo_1.tipoDato.CARACTER: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    var da = der + '';
                    var res = da.charCodeAt(0);
                    return parseFloat(izq) + res;
            }
        }
        else if (numero == 3) {
            //boolean
            switch (op2 //OPERADOR 2
            ) {
                case Tipo_1.tipoDato.ENTERO: //retorna entero
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                    var dats = izq + '';
                    var otr = dats.toLowerCase();
                    if (otr == 'true')
                        return parseInt(der) + 1;
                    return parseInt(der);
                case Tipo_1.tipoDato.DECIMAL: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    var dats1 = izq + '';
                    var otr1 = dats1.toLowerCase();
                    return otr1 == 'true' ? parseFloat(der) + 1 : parseFloat(der);
                case Tipo_1.tipoDato.CADENA: //retorna cadena
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                    return izq + '' + der;
                default:
                    //error
                    return new Errores_1.default('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
        else if (numero == 4) {
            //cadena
            switch (op2 //OPERADOR 2
            ) {
                case Tipo_1.tipoDato.ENTERO: //retorna cadena
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                    return izq + '' + der;
                case Tipo_1.tipoDato.DECIMAL: //retorna cadena
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                    return izq + '' + der;
                case Tipo_1.tipoDato.BOOLEANO: //retorna cadena
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                    return izq + '' + der;
                case Tipo_1.tipoDato.CADENA: //retorna cadena
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                    return izq + '' + der;
                case Tipo_1.tipoDato.CARACTER: //retorna cadena
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                    var dato = der;
                    return izq + '' + dato;
            }
        }
        else if (numero == 5) {
            //caracter
            switch (op2 //OPERADOR 2
            ) {
                case Tipo_1.tipoDato.ENTERO: //retorna entero
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                    var da1 = izq + '';
                    var res1 = da1.charCodeAt(0);
                    return res1 + parseInt(der);
                case Tipo_1.tipoDato.DECIMAL: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    var da1 = izq + '';
                    var res1 = da1.charCodeAt(0);
                    return res1 + parseFloat(der);
                case Tipo_1.tipoDato.CADENA: //retorna cadena
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                    var otro11 = izq;
                    return otro11 + '' + der;
                case Tipo_1.tipoDato.CARACTER: //retorna cadena
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                    var otro = der;
                    var otro1 = izq;
                    return otro1 + '' + otro;
                default:
                    //error semantico
                    return new Errores_1.default('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
    };
    /*----------------------------------------------------------RESTA------------------------------------------------- */
    Aritmetica.prototype.operador1Resta = function (izq, der) {
        var _a, _b;
        var op1 = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        var op2 = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (op1 //operador 1
        ) {
            case Tipo_1.tipoDato.ENTERO:
                return this.op2Resta(1, op2, izq, der);
            case Tipo_1.tipoDato.DECIMAL:
                return this.op2Resta(2, op2, izq, der);
            case Tipo_1.tipoDato.BOOLEANO:
                return this.op2Resta(3, op2, izq, der);
            case Tipo_1.tipoDato.CADENA:
                return this.op2Resta(4, op2, izq, der);
            case Tipo_1.tipoDato.CARACTER:
                return this.op2Resta(5, op2, izq, der);
        }
    };
    Aritmetica.prototype.op2Resta = function (numero, op2, izq, der) {
        if (numero == 1) {
            //entero
            switch (op2 //OPERADOR 2
            ) {
                case Tipo_1.tipoDato.ENTERO: //retorna entero
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                    return parseInt(izq) - parseInt(der);
                case Tipo_1.tipoDato.DECIMAL: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    return parseFloat(izq) - parseFloat(der);
                case Tipo_1.tipoDato.BOOLEANO: //retorna entero
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                    var dats = der + '';
                    var otr = dats.toLowerCase();
                    return otr == 'true' ? parseInt(izq) - 1 : parseInt(izq);
                case Tipo_1.tipoDato.CARACTER: //retorna entero
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                    var da = der + '';
                    var res = da.charCodeAt(0);
                    return parseInt(izq) - res;
                default:
                    //error
                    return new Errores_1.default('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
        else if (numero == 2) {
            //decimal
            switch (op2 //OPERADOR 2
            ) {
                case Tipo_1.tipoDato.ENTERO: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    return parseFloat(izq) - parseFloat(der);
                case Tipo_1.tipoDato.DECIMAL: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    return parseFloat(izq) - parseFloat(der);
                case Tipo_1.tipoDato.BOOLEANO: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    var dats = der + '';
                    var otr = dats.toLowerCase();
                    return otr == 'true' ? parseFloat(izq) - 1 : parseFloat(izq);
                case Tipo_1.tipoDato.CARACTER: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    var da = der + '';
                    var res = da.charCodeAt(0);
                    return parseFloat(izq) - res;
                default:
                    //error
                    return new Errores_1.default('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
        else if (numero == 3) {
            //boolean
            switch (op2 //OPERADOR 2
            ) {
                case Tipo_1.tipoDato.ENTERO: //retorna entero
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                    var dats = izq + '';
                    var otr = dats.toLowerCase();
                    return otr == 'true' ? parseInt(der) - 1 : parseInt(der);
                case Tipo_1.tipoDato.DECIMAL: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    var dats1 = izq + '';
                    var otr1 = dats1.toLowerCase();
                    return otr1 == 'true' ? parseFloat(der) - 1 : parseFloat(der);
                default:
                    //error
                    return new Errores_1.default('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
        else if (numero == 4) {
            //cadena
            return new Errores_1.default('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
        }
        else if (numero == 5) {
            //caracter
            switch (op2 //OPERADOR 2
            ) {
                case Tipo_1.tipoDato.ENTERO: //retorna entero
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                    var da1 = izq + '';
                    var res1 = da1.charCodeAt(0);
                    return res1 - parseInt(der);
                case Tipo_1.tipoDato.DECIMAL: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    var da1 = izq + '';
                    var res1 = da1.charCodeAt(0);
                    return res1 - parseFloat(der);
                default:
                    //error semantico
                    return new Errores_1.default('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
    };
    /*----------------------------------------------------------MULTIPLICACION------------------------------------------------- */
    Aritmetica.prototype.operador1Multi = function (izq, der) {
        var _a, _b;
        var op1 = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        var op2 = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (op1 //operador 1
        ) {
            case Tipo_1.tipoDato.ENTERO:
                return this.op2Multi(1, op2, izq, der);
            case Tipo_1.tipoDato.DECIMAL:
                return this.op2Multi(2, op2, izq, der);
            case Tipo_1.tipoDato.BOOLEANO:
                return this.op2Multi(3, op2, izq, der);
            case Tipo_1.tipoDato.CADENA:
                return this.op2Multi(4, op2, izq, der);
            case Tipo_1.tipoDato.CARACTER:
                return this.op2Multi(5, op2, izq, der);
        }
    };
    Aritmetica.prototype.op2Multi = function (numero, op2, izq, der) {
        if (numero == 1) {
            //entero
            switch (op2 //OPERADOR 2
            ) {
                case Tipo_1.tipoDato.ENTERO: //retorna entero
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                    return parseInt(izq) * parseInt(der);
                case Tipo_1.tipoDato.DECIMAL: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    return parseFloat(izq) * parseFloat(der);
                case Tipo_1.tipoDato.CARACTER: //retorna entero
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                    var da = der + '';
                    var res = da.charCodeAt(0);
                    return parseInt(izq) * res;
                default:
                    //error
                    return new Errores_1.default('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
        else if (numero == 2) {
            //decimal
            switch (op2 //OPERADOR 2
            ) {
                case Tipo_1.tipoDato.ENTERO: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    return parseFloat(izq) * parseFloat(der);
                case Tipo_1.tipoDato.DECIMAL: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    return parseFloat(izq) * parseFloat(der);
                case Tipo_1.tipoDato.CARACTER: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    var da = der + '';
                    var res = da.charCodeAt(0);
                    return parseFloat(izq) * res;
                default:
                    //error
                    return new Errores_1.default('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
        else if (numero == 3) {
            //boolean
            //error
            return new Errores_1.default('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
        }
        else if (numero == 4) {
            //cadena
            //error
            return new Errores_1.default('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
        }
        else if (numero == 5) {
            //caracter
            switch (op2 //OPERADOR 2
            ) {
                case Tipo_1.tipoDato.ENTERO: //retorna entero
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                    var da1 = izq + '';
                    var res1 = da1.charCodeAt(0);
                    return res1 * parseInt(der);
                case Tipo_1.tipoDato.DECIMAL: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    var da1 = izq + '';
                    var res1 = da1.charCodeAt(0);
                    return res1 * parseFloat(der);
                default:
                    //error semantico
                    return new Errores_1.default('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
    };
    /*----------------------------------------------------------DIVISION------------------------------------------------- */
    Aritmetica.prototype.operador1Division = function (izq, der) {
        var _a, _b;
        var op1 = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        var op2 = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (op1 //operador 1
        ) {
            case Tipo_1.tipoDato.ENTERO:
                return this.op2Division(1, op2, izq, der);
            case Tipo_1.tipoDato.DECIMAL:
                return this.op2Division(2, op2, izq, der);
            case Tipo_1.tipoDato.BOOLEANO:
                return this.op2Division(3, op2, izq, der);
            case Tipo_1.tipoDato.CADENA:
                return this.op2Division(4, op2, izq, der);
            case Tipo_1.tipoDato.CARACTER:
                return this.op2Division(5, op2, izq, der);
        }
    };
    Aritmetica.prototype.op2Division = function (numero, op2, izq, der) {
        if (numero == 1) {
            //entero
            switch (op2 //OPERADOR 2
            ) {
                case Tipo_1.tipoDato.ENTERO: //retorna entero
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    return der != 0
                        ? parseInt(izq) / parseInt(der)
                        : 'NO SE PUEDE DIVIDIR SOBRE CERO';
                case Tipo_1.tipoDato.DECIMAL: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    return der != 0
                        ? parseFloat(izq) / parseFloat(der)
                        : 'NO SE PUEDE DIVIDIR SOBRE CERO';
                case Tipo_1.tipoDato.CARACTER: //retorna entero
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    var da = der + '';
                    var res = da.charCodeAt(0);
                    return res != 0
                        ? parseInt(izq) / res
                        : 'NO SE PUEDE DIVIDIR SOBRE CERO';
                default:
                    //error
                    return new Errores_1.default('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
        else if (numero == 2) {
            //decimal
            switch (op2 //OPERADOR 2
            ) {
                case Tipo_1.tipoDato.ENTERO: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    return der != 0
                        ? parseFloat(izq) / parseFloat(der)
                        : 'NO SE PUEDE DIVIDIR SOBRE CERO';
                case Tipo_1.tipoDato.DECIMAL: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    return der != 0
                        ? parseFloat(izq) * parseFloat(der)
                        : 'NO SE PUEDE DIVIDIR SOBRE CERO';
                case Tipo_1.tipoDato.CARACTER: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    var da = der + '';
                    var res = da.charCodeAt(0);
                    return der != 0
                        ? parseFloat(izq) / res
                        : 'NO SE PUEDE DIVIDIR SOBRE CERO';
                default:
                    //error
                    return new Errores_1.default('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
        else if (numero == 3) {
            //boolean
            //error
            return new Errores_1.default('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
        }
        else if (numero == 4) {
            //cadena
            //error
            return new Errores_1.default('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
        }
        else if (numero == 5) {
            //caracter
            switch (op2 //OPERADOR 2
            ) {
                case Tipo_1.tipoDato.ENTERO: //retorna entero
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    var da1 = izq + '';
                    var res1 = da1.charCodeAt(0);
                    return der != 0
                        ? res1 / parseInt(der)
                        : 'NO SE PUEDE DIVIDIR SOBRE CERO';
                case Tipo_1.tipoDato.DECIMAL: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    var da1 = izq + '';
                    var res1 = da1.charCodeAt(0);
                    return der != 0
                        ? res1 / parseFloat(der)
                        : 'NO SE PUEDE DIVIDIR SOBRE CERO';
                default:
                    //error semantico
                    return new Errores_1.default('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
    };
    /*----------------------------------------------------------POTENCIA------------------------------------------------- */
    Aritmetica.prototype.operador1Potencia = function (izq, der) {
        var _a, _b;
        var op1 = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        var op2 = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (op1 //operador 1
        ) {
            case Tipo_1.tipoDato.ENTERO:
                return this.op2Potencia(1, op2, izq, der);
            case Tipo_1.tipoDato.DECIMAL:
                return this.op2Potencia(2, op2, izq, der);
            case Tipo_1.tipoDato.BOOLEANO:
                return this.op2Potencia(3, op2, izq, der);
            case Tipo_1.tipoDato.CADENA:
                return this.op2Potencia(4, op2, izq, der);
            case Tipo_1.tipoDato.CARACTER:
                return this.op2Potencia(5, op2, izq, der);
        }
    };
    Aritmetica.prototype.op2Potencia = function (numero, op2, izq, der) {
        if (numero == 1) {
            //entero
            switch (op2 //OPERADOR 2
            ) {
                case Tipo_1.tipoDato.ENTERO: //retorna entero
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                    return Math.pow(parseInt(izq), parseInt(der));
                case Tipo_1.tipoDato.DECIMAL: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    return Math.pow(parseFloat(izq), parseFloat(der));
                default:
                    //error
                    return new Errores_1.default('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
        else if (numero == 2) {
            //decimal
            switch (op2 //OPERADOR 2
            ) {
                case Tipo_1.tipoDato.ENTERO: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    return Math.pow(parseFloat(izq), parseFloat(der));
                case Tipo_1.tipoDato.DECIMAL: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    return Math.pow(parseFloat(izq), parseFloat(der));
                default:
                    //error
                    return new Errores_1.default('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
        else if (numero == 3) {
            //boolean
            //error
            return new Errores_1.default('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
        }
        else if (numero == 4) {
            //cadena
            //error
            return new Errores_1.default('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
        }
        else if (numero == 5) {
            //caracter
            //error
            return new Errores_1.default('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
        }
    };
    /*----------------------------------------------------------MODULACION------------------------------------------------- */
    Aritmetica.prototype.operador1Mod = function (izq, der) {
        var _a, _b;
        var op1 = (_a = this.operando1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        var op2 = (_b = this.operando2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (op1 //operador 1
        ) {
            case Tipo_1.tipoDato.ENTERO:
                return this.op2Mod(1, op2, izq, der);
            case Tipo_1.tipoDato.DECIMAL:
                return this.op2Mod(2, op2, izq, der);
            case Tipo_1.tipoDato.BOOLEANO:
                return this.op2Mod(3, op2, izq, der);
            case Tipo_1.tipoDato.CADENA:
                return this.op2Mod(4, op2, izq, der);
            case Tipo_1.tipoDato.CARACTER:
                return this.op2Mod(5, op2, izq, der);
        }
    };
    Aritmetica.prototype.op2Mod = function (numero, op2, izq, der) {
        if (numero == 1) {
            //entero
            switch (op2 //OPERADOR 2
            ) {
                case Tipo_1.tipoDato.ENTERO: //retorna entero
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                    return parseInt(izq) % parseInt(der);
                case Tipo_1.tipoDato.DECIMAL: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    return parseFloat(izq) % parseFloat(der);
                default:
                    //error
                    return new Errores_1.default('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
        else if (numero == 2) {
            //decimal
            switch (op2 //OPERADOR 2
            ) {
                case Tipo_1.tipoDato.ENTERO: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    return parseFloat(izq) % parseFloat(der);
                case Tipo_1.tipoDato.DECIMAL: //retorna decimal
                    this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                    return parseFloat(izq) % parseFloat(der);
                default:
                    //error
                    return new Errores_1.default('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
            }
        }
        else if (numero == 3) {
            //boolean
            //error
            return new Errores_1.default('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
        }
        else if (numero == 4) {
            //cadena
            //error
            return new Errores_1.default('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
        }
        else if (numero == 5) {
            //caracter
            //error
            return new Errores_1.default('SEMANTICO', 'TIPO DE DATO NO PERMITIDO', this.fila, this.columna);
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
