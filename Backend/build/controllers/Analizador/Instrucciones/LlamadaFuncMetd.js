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
var reporteTabla_1 = require("../../Reportes/reporteTabla");
var Instruccion_1 = require("../Abastracto/Instruccion");
var nodoAST_1 = __importDefault(require("../Abastracto/nodoAST"));
var Errores_1 = __importDefault(require("../Excepciones/Errores"));
var tablaSimbolos_1 = __importDefault(require("../Simbolos/tablaSimbolos"));
var Tipo_1 = __importStar(require("../Simbolos/Tipo"));
var Declaracion_1 = __importDefault(require("./Declaracion"));
var declaracionListas_1 = __importDefault(require("./declaracionListas"));
var declaracionVectores_1 = __importDefault(require("./declaracionVectores"));
var Funciones_1 = __importDefault(require("./Funciones"));
var Metodos_1 = __importDefault(require("./Metodos"));
var LlamadaFuncMetd = /** @class */ (function (_super) {
    __extends(LlamadaFuncMetd, _super);
    function LlamadaFuncMetd(identificador, parametros, fila, columna) {
        var _this = _super.call(this, new Tipo_1.default(Tipo_1.tipoDato.ENTERO), fila, columna) || this;
        _this.identificador = identificador.toLowerCase();
        _this.parametros = parametros;
        return _this;
    }
    LlamadaFuncMetd.prototype.getNodo = function () {
        var nodo = new nodoAST_1.default('LLAMADA');
        nodo.agregarHijo(this.identificador + '');
        nodo.agregarHijo('(');
        this.parametros.forEach(function (element) {
            nodo.agregarHijoAST(element.getNodo());
        });
        nodo.agregarHijo(')');
        return nodo;
    };
    LlamadaFuncMetd.prototype.interpretar = function (arbol, tabla) {
        var _a, _b;
        var funcion = arbol.getFuncion(this.identificador);
        if (funcion == null)
            return new Errores_1.default('SEMANTICO', 'NO SE ENCONTRO LA FUNCION', this.fila, this.columna);
        if (funcion instanceof Metodos_1.default) {
            var metodo = funcion;
            if (metodo.parametros.length == ((_a = this.parametros) === null || _a === void 0 ? void 0 : _a.length)) {
                var nuevaTabla = new tablaSimbolos_1.default(arbol.gettablaGlobal());
                for (var param = 0; param < this.parametros.length; param++) {
                    var newVal = this.parametros[param].interpretar(arbol, tabla);
                    if (newVal instanceof Errores_1.default)
                        return newVal;
                    var dec = void 0;
                    if (metodo.parametros[param].arreglo) {
                        dec = new declaracionVectores_1.default(metodo.parametros[param].tipato, metodo.parametros[param].identificador, false, metodo.fila, metodo.columna);
                    }
                    else if (metodo.parametros[param].lista) {
                        dec = new declaracionListas_1.default(metodo.parametros[param].tipato, metodo.parametros[param].identificador, metodo.fila, metodo.columna, metodo.parametros[param].tipato, undefined);
                    }
                    else {
                        dec = new Declaracion_1.default(metodo.parametros[param].tipato, metodo.fila, metodo.columna, metodo.parametros[param].identificador);
                    }
                    var nuevaDec = dec.interpretar(arbol, nuevaTabla);
                    if (nuevaDec instanceof Errores_1.default)
                        return nuevaDec;
                    var variable = nuevaTabla.getVariable(metodo.parametros[param].identificador);
                    if (variable != null) {
                        if (variable.gettipo().getTipo() !=
                            this.parametros[param].tipoDato.getTipo()) {
                            return new Errores_1.default('SEMANTICO', 'VARIABLE ' +
                                metodo.parametros[param].identificador +
                                ' TIPOS DE DATOS DIFERENTES', this.fila, this.columna);
                        }
                        else {
                            variable.setvalor(newVal);
                            nuevaTabla.setNombre(metodo.identificador);
                            if (!arbol.actualizarTabla(this.identificador.toString(), '', this.fila.toString(), nuevaTabla.getNombre().toString(), this.columna.toString())) {
                                var nuevoSimbolo = new reporteTabla_1.reporteTabla(this.identificador, '', 'Metodo', 'Void', nuevaTabla.getNombre(), this.fila.toString(), this.columna.toString());
                                arbol.listaSimbolos.push(nuevoSimbolo);
                            }
                        }
                    }
                    else {
                        return new Errores_1.default('SEMANTICO', 'VARIABLE ' +
                            metodo.parametros[param].identificador +
                            ' NO EXISTE', this.fila, this.columna);
                    }
                }
                var nuevMet = metodo.interpretar(arbol, nuevaTabla);
                if (nuevMet instanceof Errores_1.default)
                    return nuevMet;
            }
            else {
                return new Errores_1.default('SEMANTICO', 'PARAMETROS NO COINCIDENTES', this.fila, this.columna);
            }
        }
        else if (funcion instanceof Funciones_1.default) {
            var metodo = funcion;
            if (metodo.parametros.length == ((_b = this.parametros) === null || _b === void 0 ? void 0 : _b.length)) {
                var nuevaTabla = new tablaSimbolos_1.default(arbol.gettablaGlobal());
                for (var param = 0; param < this.parametros.length; param++) {
                    var newVal = this.parametros[param].interpretar(arbol, tabla);
                    if (newVal instanceof Errores_1.default)
                        return newVal;
                    var dec = new Declaracion_1.default(metodo.parametros[param].tipato, metodo.fila, metodo.columna, metodo.parametros[param].identificador);
                    var nuevaDec = dec.interpretar(arbol, nuevaTabla);
                    if (nuevaDec instanceof Errores_1.default)
                        return nuevaDec;
                    var variable = nuevaTabla.getVariable(metodo.parametros[param].identificador);
                    if (variable != null) {
                        if (variable.gettipo().getTipo() !=
                            this.parametros[param].tipoDato.getTipo()) {
                            return new Errores_1.default('SEMANTICO', 'VARIABLE ' +
                                metodo.parametros[param].identificador +
                                ' TIPOS DE DATOS DIFERENTES', this.fila, this.columna);
                        }
                        else {
                            variable.setvalor(newVal);
                            nuevaTabla.setNombre(metodo.identificador);
                            if (!arbol.actualizarTabla(metodo.identificador.toString(), newVal, this.fila.toString(), tabla.getNombre().toString(), this.columna.toString())) {
                                var nuevoSimbolo = new reporteTabla_1.reporteTabla(metodo.identificador, newVal, 'Funcion', cambiarTipo_1.default(this.tipoDato.getTipo()) + '', tabla.getNombre(), this.fila.toString(), this.columna.toString());
                                arbol.listaSimbolos.push(nuevoSimbolo);
                            }
                            //nueva variable
                        }
                    }
                    else {
                        return new Errores_1.default('SEMANTICO', 'VARIABLE ' +
                            metodo.parametros[param].identificador +
                            ' NO EXISTE', this.fila, this.columna);
                    }
                }
                var nuevMet = metodo.interpretar(arbol, nuevaTabla);
                if (nuevMet instanceof Errores_1.default)
                    return nuevMet;
                this.tipoDato = metodo.tipoDato;
                return nuevMet;
            }
            else {
                return new Errores_1.default('SEMANTICO', 'PARAMETROS NO COINCIDENTES', this.fila, this.columna);
            }
        }
    };
    return LlamadaFuncMetd;
}(Instruccion_1.Instruccion));
exports.default = LlamadaFuncMetd;
