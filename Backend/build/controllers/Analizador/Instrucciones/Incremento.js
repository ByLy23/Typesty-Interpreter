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
var Errores_1 = __importDefault(require("../Excepciones/Errores"));
var Identificador_1 = __importDefault(require("../Expresiones/Identificador"));
var Tipo_1 = __importStar(require("../Simbolos/Tipo"));
var Decremento = /** @class */ (function (_super) {
    __extends(Decremento, _super);
    function Decremento(identificador, fila, columna) {
        var _this = _super.call(this, new Tipo_1.default(Tipo_1.tipoDato.ENTERO), fila, columna) || this;
        _this.identificador = identificador;
        return _this;
    }
    Decremento.prototype.interpretar = function (arbol, tabla) {
        //tomar el tipoDato de la variable
        if (this.identificador instanceof Identificador_1.default) {
            var variable = tabla.getVariable(this.identificador.identificador);
            if (variable != null) {
                if (variable.gettipo().getTipo() == Tipo_1.tipoDato.ENTERO ||
                    variable.gettipo().getTipo() == Tipo_1.tipoDato.DECIMAL) {
                    this.tipoDato.setTipo(variable.gettipo().getTipo());
                    var uno = variable.getvalor();
                    uno++;
                    variable.setvalor(uno);
                }
                else {
                    return new Errores_1.default('SEMANTICO', 'VARIABLE ' + this.identificador + ' DEBE SER VALOR NUMERICO', this.fila, this.columna);
                }
            }
            else {
                return new Errores_1.default('SEMANTICO', 'VARIABLE ' + this.identificador + ' NO EXISTE', this.fila, this.columna);
            }
        }
        else {
            var valE = this.identificador.interpretar(arbol, tabla);
            if (valE instanceof Errores_1.default)
                return valE;
            if (this.identificador.tipoDato.getTipo() == Tipo_1.tipoDato.ENTERO) {
                this.tipoDato.setTipo(Tipo_1.tipoDato.ENTERO);
                var otro = parseInt(valE);
                otro++;
                return otro;
            }
            else if (this.identificador.tipoDato.getTipo() == Tipo_1.tipoDato.DECIMAL) {
                this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                var otro = parseFloat(valE);
                otro++;
                return otro;
            }
            else {
                return new Errores_1.default('SEMANTICO', 'VARIABLE ' + this.identificador + ' DEBE SER VALOR NUMERICO', this.fila, this.columna);
            }
        }
    };
    return Decremento;
}(Instruccion_1.Instruccion));
exports.default = Decremento;
