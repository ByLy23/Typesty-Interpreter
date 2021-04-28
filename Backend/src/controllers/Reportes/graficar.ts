import nodoAST from '../Analizador/Abastracto/nodoAST';
import { exec } from 'child_process';
import { writeFile } from 'node:fs';
import { stdout } from 'node:process';
var fs = require('fs');
let cuerpo = '';
let contador = 0;
export default function graficarArbol(arbolitos: nodoAST) {
  contador = 1;
  cuerpo = '';
  graphAST('n0', arbolitos);
  let principal = `digraph arbolAST{ 
      n0[label="${arbolitos.getValor().replace('"', '\\"')}"];
      ${cuerpo}
    }`;
  fs.writeFile('arbolAST.dot', principal, () => {
    console.log('Creado');
  });
  exec(
    'dot -Tsvg arbolAST.dot -o ../Frontend/Typesty/src/assets/arbolAST.svg',
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr:${stderr}`);
        return;
      }
      console.log(`stdout:${stdout}`);
    }
  );
  //console.log(principal);
}
function graphAST(texto: string, padre: nodoAST) {
  for (let hijo of padre.getHijos()) {
    let nombreHijo = `n${contador}`;
    cuerpo += `${nombreHijo}[label="${hijo.getValor().replace('"', '\\"')}"];
      ${texto} -> ${nombreHijo};`;
    contador++;
    graphAST(nombreHijo, hijo);
  }
}
