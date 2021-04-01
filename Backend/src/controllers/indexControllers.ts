import {Request, Response} from 'express';
//tablas arboles y excepcciones
class IndexController{
    public index(req: Request,  res: Response){
        //res.send('Mensaje');
        res.json({text:'Hola bbsitas'});
    }
    public interpretar(req: Request, res: Response){
        let parser= require('./Analizador/jpr');
        const {entrada}=req.body;
        
    }
}
export const indexController= new IndexController();