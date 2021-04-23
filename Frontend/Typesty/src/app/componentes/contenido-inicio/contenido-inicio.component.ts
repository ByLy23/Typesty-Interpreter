import { Component, OnInit } from '@angular/core';

import { InicioService } from 'src/app/servicios/inicio.service';

@Component({
  selector: 'app-contenido-inicio',
  templateUrl: './contenido-inicio.component.html',
  styleUrls: ['./contenido-inicio.component.css'],
})
export class ContenidoInicioComponent implements OnInit {
  constructor(private inicioSrv: InicioService) {}

  ngOnInit(): void {}
  interpretarContenido(texto) {
    console.log(texto);
    this.inicioSrv.compilarCodigo(texto).subscribe((mensaje) => {
      console.log(mensaje);
      this.mostrarContenido(mensaje.resultado, 'consolas');
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
    elemento.innerHTML = '';
    elemento.innerHTML = contenido;
  }
}
