"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var fs = require('fs');
var cuerpo = '';
var contador = 0;
function graficarArbol(arbolitos) {
    contador = 1;
    cuerpo = '';
    graphAST('n0', arbolitos);
    var principal = "digraph arbolAST{ \n      n0[label=\"" + arbolitos.getValor().replace('"', '\\"') + "\"];\n      " + cuerpo + "\n    }";
    fs.writeFile('arbolAST.dot', principal, function () {
        console.log('Creado');
    });
    child_process_1.exec('dot -Tsvg arbolAST.dot -o ../Frontend/Typesty/src/assets/arbolAST.svg', function (error, stdout, stderr) {
        if (error) {
            console.log("error: " + error.message);
            return;
        }
        if (stderr) {
            console.log("stderr:" + stderr);
            return;
        }
        console.log("stdout:" + stdout);
    });
    //console.log(principal);
}
exports.default = graficarArbol;
function graphAST(texto, padre) {
    for (var _i = 0, _a = padre.getHijos(); _i < _a.length; _i++) {
        var hijo = _a[_i];
        var nombreHijo = "n" + contador;
        cuerpo += nombreHijo + "[label=\"" + hijo.getValor().replace('"', '\\"') + "\"];\n      " + texto + " -> " + nombreHijo + ";";
        contador++;
        graphAST(nombreHijo, hijo);
    }
}
