import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArbolASTComponent } from './paginas/arbol-ast/arbol-ast.component';
import { ErroresComponent } from './paginas/errores/errores.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { TablaSimbolosComponent } from './paginas/tabla-simbolos/tabla-simbolos.component';

const routes: Routes = [
  { path: 'errores', component: ErroresComponent },
  { path: 'ast', component: ArbolASTComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'simbolos', component: TablaSimbolosComponent },
  { path: '', component: InicioComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
