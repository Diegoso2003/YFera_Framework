/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnalizadorStyles } from '../AnalizadorStyles';
import { ClaseColor } from './ClaseColor';

export class ColorString extends ClaseColor {
  private color: string;
  constructor(color: string) {
    super();
    this.color = color;
  }

  analizar(analizador: AnalizadorStyles): string {
    return this.color;
  }
}
