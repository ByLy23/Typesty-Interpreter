"use strict";
//relacionales
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
exports.Logicas = void 0;
var Instruccion_1 = require("../Abastracto/Instruccion");
var nodoAST_1 = __importDefault(require("../Abastracto/nodoAST"));
var Errores_1 = __importDefault(require("../Excepciones/Errores"));
var Tipo_1 = __importStar(require("../Simbolos/Tipo"));
var Logica = /** @class */ (function (_super) {
    __extends(Logica, _super);
    function Logica(relacion, fila, columna, cond1, cond2) {
        var _this = _super.call(this, new Tipo_1.default(Tipo_1.tipoDato.ENTERO), fila, columna) || this;
        _this.loogica = relacion;
        if (!cond2)
            _this.condExcep = cond1;
        else {
            _this.cond1 = cond1;
            _this.cond2 = cond2;
        }
        return _this;
    }
    Logica.prototype.getNodo = function () {
        var _a, _b;
        var nodo = new nodoAST_1.default('LOGICO');
        if (this.condExcep != null) {
            nodo.agregarHijo(this.loogica + '');
            nodo.agregarHijoAST(this.condExcep.getNodo());
        }
        else {
            nodo.agregarHijoAST((_a = this.cond1) === null || _a === void 0 ? void 0 : _a.getNodo());
            nodo.agregarHijo(this.loogica + '');
            nodo.agregarHijoAST((_b = this.cond2) === null || _b === void 0 ? void 0 : _b.getNodo());
        }
        return nodo;
    };
    Logica.prototype.interpretar = function (arbol, tabla) {
        var _a, _b;
        var izq, der, unico;
        izq = der = unico = null;
        if (this.condExcep != null) {
            unico = this.condExcep.interpretar(arbol, tabla);
            if (unico instanceof Errores_1.default)
                return unico;
        }
        else {
            izq = (_a = this.cond1) === null || _a === void 0 ? void 0 : _a.interpretar(arbol, tabla);
            if (izq instanceof Errores_1.default)
                return izq;
            der = (_b = this.cond2) === null || _b === void 0 ? void 0 : _b.interpretar(arbol, tabla);
            if (der instanceof Errores_1.default)
                return der;
        }
        //inicio comparacion
        switch (this.loogica) {
            case Logicas.AND:
                this.tipoDato.setTipo(Tipo_1.tipoDato.BOOLEANO);
                return izq && der ? true : false;
            case Logicas.OR:
                this.tipoDato.setTipo(Tipo_1.tipoDato.BOOLEANO);
                return izq || der ? true : false;
            case Logicas.NOT:
                this.tipoDato.setTipo(Tipo_1.tipoDato.BOOLEANO);
                return !unico;
        }
    };
    return Logica;
}(Instruccion_1.Instruccion));
exports.default = Logica;
var Logicas;
(function (Logicas) {
    Logicas[Logicas["OR"] = 0] = "OR";
    Logicas[Logicas["AND"] = 1] = "AND";
    Logicas[Logicas["NOT"] = 2] = "NOT";
})(Logicas = exports.Logicas || (exports.Logicas = {}));
