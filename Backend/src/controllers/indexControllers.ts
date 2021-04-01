import {Request, Response} from 'express';
//tablas arboles y excepcciones
class IndexController{
    public index(req: Request,  res: Response){
        //res.send('Mensaje');
        res.json({text:'Hola bbsitas'});
    }
}
export const indexController= new IndexController();