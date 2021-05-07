"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var Tipo_1 = __importStar(require("./Tipo"));
var tablaSimbolos = /** @class */ (function () {
    function tablaSimbolos(anterior) {
        this.tablaAnterior = anterior;
        this.tablaActual = new Map();
        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
        this.nombreDato = '';
    }
    tablaSimbolos.prototype.getAnterior = function () {
        return this.tablaAnterior;
    };
    tablaSimbolos.prototype.setAnterior = function (anterior) {
        this.tablaAnterior = anterior;
    };
    tablaSimbolos.prototype.getTabla = function () {
        return this.tablaActual;
    };
    tablaSimbolos.prototype.setTabla = function (Tabla) {
        this.tablaActual = Tabla;
    };
    tablaSimbolos.prototype.setVariable = function (simbolo) {
        console.log(simbolo);
        for (var e = this; e != null; e = e.getAnterior()) {
            var encontrado = (e.getTabla().get(simbolo.getidentificador().toLowerCase()));
            if (encontrado != null) {
                return "La variable existe actualmente";
            }
            break;
        }
        this.tablaActual.set(simbolo.getidentificador().toLowerCase(), simbolo);
        return "creada con exito";
    };
    tablaSimbolos.prototype.getVariable = function (id) {
        for (var e = this; e != null; e = e.getAnterior()) {
            var encontrado = e.getTabla().get(id);
            if (encontrado != null) {
                return encontrado;
            }
        }
        return null;
    };
    tablaSimbolos.prototype.getNombre = function () {
        return this.nombreDato;
    };
    tablaSimbolos.prototype.setNombre = function (nombre) {
        this.nombreDato = nombre;
    };
    return tablaSimbolos;
}());
exports.default = tablaSimbolos;
//ARREGLO DE SOLO ID DE METODOS
