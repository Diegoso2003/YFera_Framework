import { ClaseColor } from '../Colores/ClaseColor';
import { AtributoGeneral } from './AtributoGeneral';

export class AtributoColor extends AtributoGeneral {
  private color: ClaseColor;
  constructor(atributo: string, color: ClaseColor) {
    super(atributo);
    this.color = color;
  }
}
