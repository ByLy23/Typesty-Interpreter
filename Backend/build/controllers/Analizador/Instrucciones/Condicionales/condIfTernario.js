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
var Instruccion_1 = require("../../Abastracto/Instruccion");
var nodoAST_1 = __importDefault(require("../../Abastracto/nodoAST"));
var Errores_1 = __importDefault(require("../../Excepciones/Errores"));
var Tipo_1 = __importStar(require("../../Simbolos/Tipo"));
var condIfTernario = /** @class */ (function (_super) {
    __extends(condIfTernario, _super);
    function condIfTernario(cond, conIf, conElse, fila, columna) {
        var _this = _super.call(this, new Tipo_1.default(Tipo_1.tipoDato.ENTERO), fila, columna) || this;
        _this.condicion = cond;
        _this.condIf = conIf;
        _this.condElse = conElse;
        return _this;
    }
    condIfTernario.prototype.getNodo = function () {
        var nodo = new nodoAST_1.default('TERNARIO');
        nodo.agregarHijoAST(this.condicion.getNodo());
        nodo.agregarHijo('?');
        nodo.agregarHijoAST(this.condIf.getNodo());
        nodo.agregarHijo(':');
        nodo.agregarHijoAST(this.condElse.getNodo());
        return nodo;
    };
    condIfTernario.prototype.interpretar = function (arbol, tabla) {
        var val = this.condicion.interpretar(arbol, tabla);
        if (val instanceof Errores_1.default)
            return val;
        if (this.condicion.tipoDato.getTipo() != Tipo_1.tipoDato.BOOLEANO) {
            return new Errores_1.default('SEMANTICO', 'DATO DEBE SER BOOLEANO', this.fila, this.columna);
        }
        if (Boolean(val)) {
            var ifc = this.condIf.interpretar(arbol, tabla);
            if (ifc instanceof Errores_1.default)
                return ifc;
            this.tipoDato.setTipo(this.condIf.tipoDato.getTipo());
            return ifc;
        }
        else {
            var elsec = this.condElse.interpretar(arbol, tabla);
            if (elsec instanceof Errores_1.default)
                return elsec;
            this.tipoDato.setTipo(this.condElse.tipoDato.getTipo());
            return elsec;
        }
    };
    return condIfTernario;
}(Instruccion_1.Instruccion));
exports.default = condIfTernario;
