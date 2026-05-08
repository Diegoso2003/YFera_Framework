import { Component, effect, inject, input, model } from '@angular/core';
import { EstructuraModel } from '../../models/EstructuraModel';
import { Boton } from "../boton/boton";
import { ArchivoService } from '../../services/archivo-service';
import { ContenidoArchivo } from '../../models/ContenidoArchivo';
import { HttpErrorResponse } from '@angular/common/http';
import { Informacion } from '../../services/informacion';
import { extraerMensajeError } from '../../class/MensajeError';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editor',
  imports: [Boton,FormsModule],
  templateUrl: './editor.html',
  styleUrl: './editor.css',
})
export class Editor {
  archivo = input.required<EstructuraModel | undefined>()
  contenido = model<string>('');
  private _archivoS = inject(ArchivoService);
  private _info = inject(Informacion)

  guardar() {
    if(!this.archivo()) return;
    const contenido: ContenidoArchivo = {
      contenido: this.contenido(),
      rutaArchivo: this.archivo()!.ruta
    }
    this._archivoS.actualizarContenido(contenido).subscribe({
      next: () => {},
      error: (error: HttpErrorResponse) => {
        this._info.mostrarError(extraerMensajeError(error, 'error al guardar intente más tarde'))
      }
    })
  }
}
