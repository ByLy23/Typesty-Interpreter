import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ErroresComponent } from './paginas/errores/errores.component';
import { TablaSimbolosComponent } from './paginas/tabla-simbolos/tabla-simbolos.component';
import { ArbolASTComponent } from './paginas/arbol-ast/arbol-ast.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SideBarComponent } from './componentes/side-bar/side-bar.component';
import { TabsinicioComponent } from './componentes/tabsinicio/tabsinicio.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ContenidoInicioComponent } from './componentes/contenido-inicio/contenido-inicio.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ErroresComponent,
    TablaSimbolosComponent,
    ArbolASTComponent,
    SideBarComponent,
    TabsinicioComponent,
    ContenidoInicioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
