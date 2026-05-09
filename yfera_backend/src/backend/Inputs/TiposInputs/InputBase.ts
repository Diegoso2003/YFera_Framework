import { ElementoHTML } from '../../elementoshtml/ElementoHTML';
import { ContenidoInput } from '../ContenidoInput';

export abstract class InputBase extends ElementoHTML {
  protected contenido: ContenidoInput;
  constructor(estilos: string[], contenido: ContenidoInput) {
    super(estilos, []);
    this.contenido = contenido;
  }
}
