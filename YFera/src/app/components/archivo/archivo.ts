import { Component, input, output, signal } from '@angular/core';
import { EstructuraModel } from '../../models/EstructuraModel';

@Component({
  selector: 'app-archivo',
  imports: [],
  templateUrl: './archivo.html',
  styleUrl: './archivo.css',
})
export class Archivo {
  archivoNodo = input.required<EstructuraModel>();
  abrirArchivo = output<EstructuraModel>();
  crear = output<EstructuraModel>();
  eliminar = output<EstructuraModel>();

  expandido = signal<boolean>(false);

  toogle() {
    if(this.archivoNodo().carpeta) {
      this.expandido.set(!this.expandido())
    } else {
      this.abrirArchivo.emit(this.archivoNodo());
    }
  }
}
