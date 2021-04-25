import { Router } from 'express';
import { indexController } from '../controllers/indexControllers';
//import {indexController} from '../controllers/indexController';
class IndexRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }

  config(): void {
    this.router.get('/', indexController.index);
    this.router.post('/interpretar', indexController.interpretar);
    this.router.get('/obtenerTabla', indexController.generarTabla);
  }
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
