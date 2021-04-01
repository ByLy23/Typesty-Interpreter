"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
//tablas arboles y excepcciones
var IndexController = /** @class */ (function () {
    function IndexController() {
    }
    IndexController.prototype.index = function (req, res) {
        //res.send('Mensaje');
        res.json({ text: 'Hola bbsitas' });
    };
    return IndexController;
}());
exports.indexController = new IndexController();
