"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var indexControllers_1 = require("../controllers/indexControllers");
//import {indexController} from '../controllers/indexController';
var IndexRoutes = /** @class */ (function () {
    function IndexRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    IndexRoutes.prototype.config = function () {
        this.router.get('/', indexControllers_1.indexController.index);
        this.router.post('/interpretar', indexControllers_1.indexController.interpretar);
        this.router.get('/obtenerTabla', indexControllers_1.indexController.generarTabla);
    };
    return IndexRoutes;
}());
var indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
