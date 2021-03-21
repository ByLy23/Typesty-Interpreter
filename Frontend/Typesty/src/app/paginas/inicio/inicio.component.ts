import { Component, OnInit } from '@angular/core';
import { InicioService } from 'src/app/servicios/inicio.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private iniSrv: InicioService
  ) { }

  ngOnInit(): void {
    this.iniSrv.obtenerAlgo().subscribe(res=>{
      console.log(res);
    });
  }

}
