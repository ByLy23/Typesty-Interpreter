import tablaSimbolos from "./tablaSimbolos";
import {Instruccion} from '../Abastracto/Instruccion';
export default class Arbol{
    private instrucciones: Array<Instruccion>;
    public getinstrucciones(): Array<Instruccion> {
        return this.instrucciones;
    }
    public setinstrucciones(value: Array<Instruccion>) {
        this.instrucciones = value;
    }
    private consola: String;
    public getconsola(): String {
        return this.consola;
    }
    public setconsola(value: String) {
        this.consola = value;
    }
    public actualizaConsola(uptodate: String){
        this.consola=`${this.consola}${uptodate}\n`;
    }
    private tablaGlobal: tablaSimbolos;
    public gettablaGlobal(): tablaSimbolos {
        return this.tablaGlobal;
    }
    public settablaGlobal(value: tablaSimbolos) {
        this.tablaGlobal = value;
    }

    constructor(instrucciones: Array<Instruccion>){
        this.instrucciones=instrucciones;
        this.consola="";
        this.tablaGlobal=new tablaSimbolos();
    }
}