import { Simbolo } from '../Simbolo';

export class ElementoFor {
  private valor1: string;
  private valor2: string;
  private simbolo1: Simbolo;
  private simbolo2: Simbolo;

  constructor(valor1: string, valor2: string, simbolo1: Simbolo, simbolo2: Simbolo) {
    this.valor1 = valor1;
    this.valor2 = valor2;
    this.simbolo1 = simbolo1;
    this.simbolo2 = simbolo2;
  }

  public getValor1(): string {
    return this.valor1;
  }
  public setValor1(value: string) {
    this.valor1 = value;
  }

  public getValor2(): string {
    return this.valor2;
  }
  public setValor2(value: string) {
    this.valor2 = value;
  }

  public getSimbolo1(): Simbolo {
    return this.simbolo1;
  }
  public setSimbolo1(value: Simbolo) {
    this.simbolo1 = value;
  }

  public getSimbolo2(): Simbolo {
    return this.simbolo2;
  }
  public setSimbolo2(value: Simbolo) {
    this.simbolo2 = value;
  }
}
