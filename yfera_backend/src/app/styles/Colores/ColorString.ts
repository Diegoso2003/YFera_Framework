import { ClaseColor } from './ClaseColor';

export class ColorString extends ClaseColor {
  private color: string;
  constructor(color: string) {
    super();
    this.color = color;
  }
}
