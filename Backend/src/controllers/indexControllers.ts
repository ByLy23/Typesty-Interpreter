import { Request, Response } from 'express';
import Errores from './Analizador/Excepciones/Errores';
import Asignacion from './Analizador/Instrucciones/Asignacion';
import Declaracion from './Analizador/Instrucciones/Declaracion';
import Exec from './Analizador/Instrucciones/Exec';
import Funciones from './Analizador/Instrucciones/Funciones';
import LlamadaFuncMetd from './Analizador/Instrucciones/LlamadaFuncMetd';
import Metodos from './Analizador/Instrucciones/Metodos';
import Arbol from './Analizador/Simbolos/Arbol';
import tablaSimbolos from './Analizador/Simbolos/tablaSimbolos';

export let listaErrores: Array<Errores>;
//tablas arboles y excepcciones
class IndexController {
  public index(req: Request, res: Response) {
    //res.send('Mensaje');
    res.json({ text: 'Hola bbsitas' });
  }
  public interpretar(req: Request, res: Response) {
    listaErrores = new Array<Errores>();
    let parser = require('./Analizador/analizador');
    const { entrada } = req.body;
    try {
      console.log(entrada);
      let ast = new Arbol(parser.parse(entrada));
      var tabla = new tablaSimbolos();
      ast.settablaGlobal(tabla);

      for (let i of ast.getinstrucciones()) {
        if (i instanceof Metodos || i instanceof Funciones) {
          ast.getfunciones().push(i);
        }
      }

      for (let i of ast.getinstrucciones()) {
        if (i instanceof Errores) {
          listaErrores.push(i);
          ast.actualizaConsola((<Errores>i).returnError());
        }
        if (i instanceof Metodos || i instanceof Funciones) continue;
        if (
          i instanceof Declaracion ||
          i instanceof Asignacion ||
          i instanceof Exec
        ) {
          var resultador = i.interpretar(ast, tabla);
          if (resultador instanceof Errores) {
            listaErrores.push(resultador);
            ast.actualizaConsola((<Errores>resultador).returnError());
          }
        } else {
          let error = new Errores(
            'SEMANTICO',
            'SENTENCIA FUERA DE METODO',
            i.fila,
            i.columna
          );
          listaErrores.push(error);
          ast.actualizaConsola((<Errores>error).returnError());
        }
      }
      res.send({ resultado: ast.getconsola(), errores: listaErrores });
    } catch (err) {
      res.json({ error: err, errores: listaErrores });
    }
  }
}
export const indexController = new IndexController();
