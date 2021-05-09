import { Request, Response } from 'express';
import nodoAST from './Analizador/Abastracto/nodoAST';
import Errores from './Analizador/Excepciones/Errores';
import Asignacion from './Analizador/Instrucciones/Asignacion';
import Declaracion from './Analizador/Instrucciones/Declaracion';
import declaracionVectores from './Analizador/Instrucciones/declaracionVectores';
import declaracionListas from './Analizador/Instrucciones/declaracionListas';
import Exec from './Analizador/Instrucciones/Exec';
import Funciones from './Analizador/Instrucciones/Funciones';
import Metodos from './Analizador/Instrucciones/Metodos';
import Arbol from './Analizador/Simbolos/Arbol';
import tablaSimbolos from './Analizador/Simbolos/tablaSimbolos';
import graficarArbol from './Reportes/graficar';
import asignacionVector from './Analizador/Instrucciones/asignacionVector';
import asignacionLista from './Analizador/Instrucciones/asignacionLista';
import agregarLista from './Analizador/Instrucciones/agregarLista';

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
          i instanceof declaracionVectores ||
          i instanceof declaracionListas ||
          i instanceof asignacionVector ||
          i instanceof asignacionLista ||
          i instanceof agregarLista ||
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

      arbolNuevo = ast;
      res.send({
        resultado: ast.getconsola(),
        errores: listaErrores,
        tabla: ast.getSimbolos(),
      });
    } catch (err) {
      res.json({ error: err, errores: listaErrores });
    }
  }
  public graficar(req: Request, res: Response) {
    let otro = arbolNuevo;
    if (otro == null) return res.json({ msg: false });
    let arbolAst = new nodoAST('RAIZ');
    let nodoINS = new nodoAST('INSTRUCCIONES');
    otro.getinstrucciones().forEach((element) => {
      nodoINS.agregarHijoAST(element.getNodo());
    });
    arbolAst.agregarHijoAST(nodoINS);
    graficarArbol(<nodoAST>arbolAst);
    return res.json({ msg: true });
  }
}
export const indexController = new IndexController();
