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
var indexControllers_1 = require("../../../indexControllers");
var Instruccion_1 = require("../../Abastracto/Instruccion");
var nodoAST_1 = __importDefault(require("../../Abastracto/nodoAST"));
var Errores_1 = __importDefault(require("../../Excepciones/Errores"));
var tablaSimbolos_1 = __importDefault(require("../../Simbolos/tablaSimbolos"));
var Tipo_1 = __importStar(require("../../Simbolos/Tipo"));
var Return_1 = __importDefault(require("../Return"));
var condFor = /** @class */ (function (_super) {
    __extends(condFor, _super);
    function condFor(declasignacion, condicion, actualizacion, instrucciones, fila, columna) {
        var _this = _super.call(this, new Tipo_1.default(Tipo_1.tipoDato.ENTERO), fila, columna) || this;
        _this.declaracionAsignacion = declasignacion;
        _this.actualizacion = actualizacion;
        _this.condicion = condicion;
        _this.instrucciones = instrucciones;
        return _this;
    }
    condFor.prototype.getNodo = function () {
        var nodo = new nodoAST_1.default('FOR');
        nodo.agregarHijo('for');
        nodo.agregarHijo('(');
        nodo.agregarHijoAST(this.declaracionAsignacion.getNodo());
        nodo.agregarHijo(';');
        nodo.agregarHijoAST(this.condicion.getNodo());
        nodo.agregarHijo(';');
        nodo.agregarHijoAST(this.actualizacion.getNodo());
        nodo.agregarHijo(')');
        nodo.agregarHijo('{');
        this.instrucciones.forEach(function (element) {
            nodo.agregarHijoAST(element.getNodo());
        });
        nodo.agregarHijo('}');
        return nodo;
    };
    condFor.prototype.interpretar = function (arbol, tabla) {
        var nuevaTabla = new tablaSimbolos_1.default(tabla);
        nuevaTabla.setNombre('For');
        var declaAsig = this.declaracionAsignacion.interpretar(arbol, nuevaTabla);
        if (declaAsig instanceof Errores_1.default)
            return declaAsig;
        var val = this.condicion.interpretar(arbol, nuevaTabla);
        if (val instanceof Errores_1.default)
            return val;
        if (this.condicion.tipoDato.getTipo() != Tipo_1.tipoDato.BOOLEANO) {
            return new Errores_1.default('SEMANTICO', 'DATO DEBE SER BOOLEANO', this.fila, this.columna);
        }
        while (this.condicion.interpretar(arbol, nuevaTabla)) {
            var otraTabla = new tablaSimbolos_1.default(nuevaTabla);
            otraTabla.setNombre('ForDentro');
            for (var i = 0; i < this.instrucciones.length; i++) {
                var a = this.instrucciones[i].interpretar(arbol, otraTabla);
                if (a instanceof Errores_1.default) {
                    indexControllers_1.listaErrores.push(a);
                    arbol.actualizaConsola(a.returnError());
                }
                if (a instanceof Return_1.default)
                    return a;
                if (a == 'ByLyContinue')
                    break;
                if (a == 'ByLy23')
                    return;
            }
            var valActualizacion = this.actualizacion.interpretar(arbol, nuevaTabla);
            if (valActualizacion instanceof Errores_1.default)
                return valActualizacion;
        }
    };
    return condFor;
}(Instruccion_1.Instruccion));
exports.default = condFor;
