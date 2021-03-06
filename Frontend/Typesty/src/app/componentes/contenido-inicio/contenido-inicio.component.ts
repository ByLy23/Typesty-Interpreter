import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InicioService } from 'src/app/servicios/inicio.service';

@Component({
  selector: 'app-contenido-inicio',
  templateUrl: './contenido-inicio.component.html',
  styleUrls: ['./contenido-inicio.component.css'],
})
export class ContenidoInicioComponent implements OnInit {
  constructor(private inicioSrv: InicioService, private dialog: MatDialog) {
    this.code = 'asd';
  }
  code = '';
  contenido = '';
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.data = JSON.parse(localStorage.getItem('contenido'));
    if (this.data != '' || this.data != undefined) {
      this.mostrarContenido(this.data.text, 'contenido');
      this.mostrarContenido(this.data.console, 'consolas');
    }
  }
  data;

  colocarConsola(res, texto) {
    const dataObject = {
      text: texto,
      console: res,
    };
    localStorage.setItem('contenido', JSON.stringify(dataObject));
  }
  getConsola() {
    this.data = JSON.parse(localStorage.getItem('contenido'));
    if (this.data != '' || this.data != undefined) {
      this.mostrarContenido(this.data.text, 'contenido');
    }
  }
  interpretarContenido(texto) {
    this.inicioSrv.compilarCodigo(texto).subscribe((mensaje) => {
      console.log(mensaje);
      this.mostrarContenido(mensaje.resultado, 'consolas');
      let tabL = JSON.stringify(mensaje.tabla);
      let res = mensaje.resultado;
      let Error = JSON.stringify(mensaje.errores);
      let text = texto;
      this.colocarConsola(res, text);
      window.localStorage.setItem('simbolos', tabL);
      window.localStorage.setItem('errores', Error);
    });
  }
  textoEsperado = '';
  textInputChange(fileInputEvent: any) {
    var archivo = fileInputEvent.target.files[0];
    if (!archivo) {
      return;
    }
    var lector = new FileReader();
    lector.onload = (e) => {
      var contenido = e.target.result;
      this.mostrarContenido(contenido, 'contenido');
    };
    lector.readAsText(archivo);
  }
  mostrarContenido(contenido, identificador) {
    var elemento = document.getElementById(identificador);
    elemento.innerHTML = contenido;
  }

  generarAst() {
    this.inicioSrv.graficarAst().subscribe((res) => {
      if (res.msg == false) {
        alert('ALGO FALLO EN EL GRAFICO');
      } else {
        this.presentAlert();
      }
    });
  }
  presentAlert() {
    // #docregion focus-restoration
    this.dialog.open(Pruebas, {});
  }
}

@Component({
  selector: 'contenido-dialog',
  templateUrl: './contenido-dialog-component.html',
})
export class Pruebas {}
