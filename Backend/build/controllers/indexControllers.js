"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = exports.listaSimbolos = exports.listaErrores = void 0;
var Errores_1 = __importDefault(require("./Analizador/Excepciones/Errores"));
var Asignacion_1 = __importDefault(require("./Analizador/Instrucciones/Asignacion"));
var Declaracion_1 = __importDefault(require("./Analizador/Instrucciones/Declaracion"));
var Exec_1 = __importDefault(require("./Analizador/Instrucciones/Exec"));
var Funciones_1 = __importDefault(require("./Analizador/Instrucciones/Funciones"));
var Metodos_1 = __importDefault(require("./Analizador/Instrucciones/Metodos"));
var Arbol_1 = __importDefault(require("./Analizador/Simbolos/Arbol"));
var tablaSimbolos_1 = __importDefault(require("./Analizador/Simbolos/tablaSimbolos"));
var arbolNuevo;
//tablas arboles y excepcciones
var IndexController = /** @class */ (function () {
    function IndexController() {
    }
    IndexController.prototype.index = function (req, res) {
        //res.send('Mensaje');
        res.json({ text: 'Hola bbsitas' });
    };
    IndexController.prototype.interpretar = function (req, res) {
        exports.listaErrores = new Array();
        var parser = require('./Analizador/analizador');
        var entrada = req.body.entrada;
        try {
            var ast = new Arbol_1.default(parser.parse(entrada));
            var tabla = new tablaSimbolos_1.default();
            ast.settablaGlobal(tabla);
            for (var _i = 0, _a = ast.getinstrucciones(); _i < _a.length; _i++) {
                var i = _a[_i];
                if (i instanceof Metodos_1.default || i instanceof Funciones_1.default) {
                    ast.getfunciones().push(i);
                }
            }
            for (var _b = 0, _c = ast.getinstrucciones(); _b < _c.length; _b++) {
                var i = _c[_b];
                if (i instanceof Errores_1.default) {
                    exports.listaErrores.push(i);
                    ast.actualizaConsola(i.returnError());
                }
                if (i instanceof Metodos_1.default || i instanceof Funciones_1.default)
                    continue;
                if (i instanceof Declaracion_1.default ||
                    i instanceof Asignacion_1.default ||
                    i instanceof Exec_1.default) {
                    var resultador = i.interpretar(ast, tabla);
                    if (resultador instanceof Errores_1.default) {
                        exports.listaErrores.push(resultador);
                        ast.actualizaConsola(resultador.returnError());
                    }
                }
                else {
                    var error = new Errores_1.default('SEMANTICO', 'SENTENCIA FUERA DE METODO', i.fila, i.columna);
                    exports.listaErrores.push(error);
                    ast.actualizaConsola(error.returnError());
                }
            }
            arbolNuevo = ast;
            res.send({
                resultado: ast.getconsola(),
                errores: exports.listaErrores,
                tabla: '',
            });
        }
        catch (err) {
            res.json({ error: err, errores: exports.listaErrores });
        }
    };
    IndexController.prototype.actualizarTabla = function (identificador) { };
    return IndexController;
}());
exports.indexController = new IndexController();
