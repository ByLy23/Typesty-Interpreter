"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = exports.listaSimbolos = exports.listaErrores = void 0;
var nodoAST_1 = __importDefault(require("./Analizador/Abastracto/nodoAST"));
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
        var arbolito;
        exports.listaErrores = new Array();
        exports.listaSimbolos = new Array();
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
            var _loop_1 = function (i) {
                if (i instanceof Errores_1.default) {
                    exports.listaErrores.push(i);
                    ast.actualizaConsola(i.returnError());
                }
                if (i instanceof Metodos_1.default || i instanceof Funciones_1.default)
                    return "continue";
                if (i instanceof Declaracion_1.default ||
                    i instanceof Asignacion_1.default ||
                    i instanceof Exec_1.default) {
                    resultador = i.interpretar(ast, tabla);
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
                var arbolAst = new nodoAST_1.default('RAIZ');
                var nodoINS = new nodoAST_1.default('INSTRUCCIONES');
                ast.getinstrucciones().forEach(function (element) {
                    nodoINS.agregarHijoAST(element.getNodo());
                });
                arbolAst.agregarHijoAST(nodoINS);
                arbolito = arbolAst;
                //graficar
                console.log(arbolAst);
            };
            var resultador;
            for (var _b = 0, _c = ast.getinstrucciones(); _b < _c.length; _b++) {
                var i = _c[_b];
                _loop_1(i);
            }
            arbolNuevo = ast;
            res.send({
                resultado: ast.getconsola(),
                errores: exports.listaErrores,
                tabla: exports.listaSimbolos,
                arbol: arbolito,
            });
        }
        catch (err) {
            console.error(err);
            res.json({ error: err, errores: exports.listaErrores });
        }
    };
    IndexController.prototype.actualizarTabla = function (identificador, valor, linea, entorno, columna) {
        for (var _i = 0, listaSimbolos_1 = exports.listaSimbolos; _i < listaSimbolos_1.length; _i++) {
            var elemento = listaSimbolos_1[_i];
            if (elemento.getIdentificador() == identificador &&
                elemento.getEntorno() == entorno) {
                elemento.setValor(valor);
                elemento.setLinea(linea);
                elemento.setColumna(columna);
                return true;
            }
        }
        return false;
    };
    return IndexController;
}());
exports.indexController = new IndexController();
