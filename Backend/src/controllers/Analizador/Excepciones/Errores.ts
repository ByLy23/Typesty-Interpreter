export default class Errores {
  private tipoError: String;
  private desc: String;
  private fila: Number;
  private columna: Number;
  public getDesc(): String {
    return this.desc;
  }
  public getTipoError(): String {
    return this.tipoError;
  }
  public getcolumna(): Number {
    return this.columna;
  }
  public getFila(): Number {
    return this.fila;
  }
  constructor(tipo: String, desc: String, fila: Number, columna: Number) {
    this.tipoError = tipo;
    this.desc = desc;
    this.fila = fila;
    this.columna = columna;
  }
  public returnError(): String {
    return (
      "Se obtuvo: " +
      this.tipoError +
      " desc:{" +
      this.desc +
      "} en la fila" +
      this.fila +
      " en la columna: " +
      this.columna +
      "\n"
    );
  }
}
