"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = exports.listaErrores = void 0;
var Errores_1 = __importDefault(require("./Analizador/Excepciones/Errores"));
var Arbol_1 = __importDefault(require("./Analizador/Simbolos/Arbol"));
var tablaSimbolos_1 = __importDefault(require("./Analizador/Simbolos/tablaSimbolos"));
//tablas arboles y excepcciones
var IndexController = /** @class */ (function () {
    function IndexController() {
    }
    IndexController.prototype.index = function (req, res) {
        //res.send('Mensaje');
        res.json({ text: "Hola bbsitas" });
    };
    IndexController.prototype.interpretar = function (req, res) {
        exports.listaErrores = new Array();
        var parser = require("./Analizador/analizador");
        var entrada = req.body.entrada;
        try {
            var ast = new Arbol_1.default(parser.parse(entrada));
            var tabla = new tablaSimbolos_1.default();
            ast.settablaGlobal(tabla);
            for (var _i = 0, _a = ast.getinstrucciones(); _i < _a.length; _i++) {
                var i = _a[_i];
                if (i instanceof Errores_1.default) {
                    exports.listaErrores.push(i);
                    ast.actualizaConsola(i.returnError());
                }
                var resultador = i.interpretar(ast, tabla);
                if (resultador instanceof Errores_1.default) {
                    exports.listaErrores.push(resultador);
                    ast.actualizaConsola(resultador.returnError());
                }
            }
            res.send({ resultado: ast.getconsola(), errores: exports.listaErrores });
        }
        catch (err) {
            res.json({ error: err, errores: exports.listaErrores });
        }
    };
    return IndexController;
}());
exports.indexController = new IndexController();
