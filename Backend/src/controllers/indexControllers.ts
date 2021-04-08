import {Request, Response} from 'express';
import Errores from './Analizador/Excepciones/Errores';
import Arbol from './Analizador/Simbolos/Arbol';
import tablaSimbolos from './Analizador/Simbolos/tablaSimbolos';

let listaErrores: Array<Errores>;
//tablas arboles y excepcciones
class IndexController{
    public index(req: Request,  res: Response){
        //res.send('Mensaje');
        res.json({text:'Hola bbsitas'});
    }
    public interpretar(req: Request, res: Response){
        listaErrores= new Array<Errores>();
        let parser= require('./Analizador/analizador');
        const {entrada}=req.body;
        try{
            let ast= new Arbol(parser.parse(entrada));
            var tabla= new tablaSimbolos();
            ast.settablaGlobal(tabla);
            for(let i of ast.getinstrucciones()){
                if(i instanceof Errores){
                    listaErrores.push(i);
                    ast.actualizaConsola((<Errores>i).returnError());
                }
                var resultador= i.interpretar(ast,tabla);
                res.json({resultado: ast.getconsola()});
            }
        }catch(error){
            res.json({error:error});
        }
    }
}
export const indexController= new IndexController();