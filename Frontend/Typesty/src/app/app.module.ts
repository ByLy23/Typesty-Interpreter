import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ErroresComponent } from './paginas/errores/errores.component';
import { TablaSimbolosComponent } from './paginas/tabla-simbolos/tabla-simbolos.component';
import { ArbolASTComponent } from './paginas/arbol-ast/arbol-ast.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ErroresComponent,
    TablaSimbolosComponent,
    ArbolASTComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
