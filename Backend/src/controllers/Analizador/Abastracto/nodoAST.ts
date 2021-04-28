export default class nodoAST {
  private listaNodos: Array<nodoAST>;
  private valor: string;

  constructor(valor: string) {
    this.listaNodos = new Array<nodoAST>();
    this.valor = valor;
  }
  public agregarHijo(val: string): void {
    this.listaNodos.push(new nodoAST(val));
  }
  public agregarHijoAST(hijo: nodoAST | undefined): void {
    if (hijo != undefined) this.listaNodos.push(hijo);
  }
}
