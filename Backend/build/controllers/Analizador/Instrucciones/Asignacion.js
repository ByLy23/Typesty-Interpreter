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
var indexControllers_1 = require("../../indexControllers");
var Instruccion_1 = require("../Abastracto/Instruccion");
var Errores_1 = __importDefault(require("../Excepciones/Errores"));
var Tipo_1 = __importStar(require("../Simbolos/Tipo"));
var Asignacion = /** @class */ (function (_super) {
    __extends(Asignacion, _super);
    function Asignacion(identificador, valor, fila, columna) {
        var _this = _super.call(this, new Tipo_1.default(Tipo_1.tipoDato.ENTERO), fila, columna) || this;
        _this.identificador = identificador;
        _this.valor = valor;
        return _this;
    }
    Asignacion.prototype.interpretar = function (arbol, tabla) {
        //tomar el tipoDato de la variable
        var variable = tabla.getVariable(this.identificador);
        if (variable != null) {
            var val = this.valor.interpretar(arbol, tabla);
            if (variable.gettipo().getTipo() != this.valor.tipoDato.getTipo()) {
                return new Errores_1.default('SEMANTICO', 'VARIABLE ' + this.identificador + ' TIPOS DE DATOS DIFERENTES', this.fila, this.columna);
            }
            else {
                variable.setvalor(val);
                indexControllers_1.indexController.actualizarTabla(this.identificador, variable.getvalor(), this.fila.toString(), tabla.getNombre().toString(), this.columna.toString());
                //identificadorm,
                //actualizar valor de la tabla y no crear otra equis des
            }
        }
        else {
            return new Errores_1.default('SEMANTICO', 'VARIABLE ' + this.identificador + ' NO EXISTE', this.fila, this.columna);
        }
    };
    return Asignacion;
}(Instruccion_1.Instruccion));
exports.default = Asignacion;
