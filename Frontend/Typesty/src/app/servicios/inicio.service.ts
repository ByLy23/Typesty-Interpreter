import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InicioService {

  path:String;
  constructor(
    private http: HttpClient
  ) {
    this.path= 'http://localhost:5000';
   }

   obtenerAlgo():Observable<any>{
     return this.http.get(this.path+'/obtenerAlgo',{});
   }
}
