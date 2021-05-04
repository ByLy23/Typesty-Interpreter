import { Request, Response } from 'express';
import nodoAST from './Analizador/Abastracto/nodoAST';
import Errores from './Analizador/Excepciones/Errores';
import Asignacion from './Analizador/Instrucciones/Asignacion';
import Declaracion from './Analizador/Instrucciones/Declaracion';
import Exec from './Analizador/Instrucciones/Exec';
import Funciones from './Analizador/Instrucciones/Funciones';
import Metodos from './Analizador/Instrucciones/Metodos';
import Arbol from './Analizador/Simbolos/Arbol';
import tablaSimbolos from './Analizador/Simbolos/tablaSimbolos';
import { reporteTabla } from './Reportes/reporteTabla';
import graficarArbol from './Reportes/graficar';

export let listaErrores: Array<Errores>;
let arbolNuevo: Arbol;
let contador: number;
let cuerpo: string;
//tablas arboles y excepcciones
class IndexController {
  public index(req: Request, res: Response) {
    //res.send('Mensaje');
    res.json({ text: 'Hola bbsitas' });
  }
  public interpretar(req: Request, res: Response) {
    let arbolito;
    listaErrores = new Array<Errores>();
    let parser = require('./Analizador/analizador');
    const { entrada } = req.body;
    try {
      let ast = new Arbol(parser.parse(entrada));
      // res.json({ resultado: ast });
      // return;
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
        //graficars
      }
      let arbolAst = new nodoAST('RAIZ');
      let nodoINS = new nodoAST('INSTRUCCIONES');
      ast.getinstrucciones().forEach((element) => {
        nodoINS.agregarHijoAST(element.getNodo());
      });
      console.log(arbolAst);
      arbolAst.agregarHijoAST(nodoINS);
      graficarArbol(<nodoAST>arbolAst);
      arbolNuevo = ast;
      res.send({
        resultado: ast.getconsola(),
        errores: listaErrores,
        tabla: ast.getSimbolos(),
        arbol: arbolito,
      });
    } catch (err) {
      res.json({ error: err, errores: listaErrores });
    }
  }
}
export const indexController = new IndexController();
