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
exports.Relacionales = void 0;
//aritmeticas
var Instruccion_1 = require("../Abastracto/Instruccion");
var Errores_1 = __importDefault(require("../Excepciones/Errores"));
var Tipo_1 = __importStar(require("../Simbolos/Tipo"));
var Relacional = /** @class */ (function (_super) {
    __extends(Relacional, _super);
    function Relacional(relacion, fila, columna, cond1, cond2) {
        var _this = _super.call(this, new Tipo_1.default(Tipo_1.tipoDato.ENTERO), fila, columna) || this;
        _this.relacion = relacion;
        _this.cond1 = cond1;
        _this.cond2 = cond2;
        return _this;
    }
    Relacional.prototype.interpretar = function (arbol, tabla) {
        var izq, der;
        izq = this.cond1.interpretar(arbol, tabla);
        if (izq instanceof Errores_1.default)
            return izq;
        der = this.cond2.interpretar(arbol, tabla);
        if (der instanceof Errores_1.default)
            return der;
        switch (this.relacion) {
            case Relacionales.IGUAL:
                console.log(izq);
                return izq == der;
            case Relacionales.DIFERENTE:
                return izq != der;
            case Relacionales.MENOR:
                return izq < der;
            case Relacionales.MENORIGUAL:
                return izq <= der;
            case Relacionales.MAYOR:
                return izq > der;
            case Relacionales.MAYORIGUAL:
                return izq >= der;
            default:
                return "what";
        }
    };
    return Relacional;
}(Instruccion_1.Instruccion));
exports.default = Relacional;
var Relacionales;
(function (Relacionales) {
    Relacionales[Relacionales["IGUAL"] = 0] = "IGUAL";
    Relacionales[Relacionales["DIFERENTE"] = 1] = "DIFERENTE";
    Relacionales[Relacionales["MAYOR"] = 2] = "MAYOR";
    Relacionales[Relacionales["MENOR"] = 3] = "MENOR";
    Relacionales[Relacionales["MAYORIGUAL"] = 4] = "MAYORIGUAL";
    Relacionales[Relacionales["MENORIGUAL"] = 5] = "MENORIGUAL";
})(Relacionales = exports.Relacionales || (exports.Relacionales = {}));
