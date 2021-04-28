"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function obtenerValor(valor) {
    if (valor != undefined) {
        switch (valor) {
            case 0:
                return 'int';
            case 1:
                return 'double';
            case 2:
                return 'boolean';
            case 3:
                return 'char';
            case 4:
                return 'string';
            case 4:
                return 'void';
        }
    }
}
exports.default = obtenerValor;
