import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  model,
  signal,
  ViewChild,
} from '@angular/core';
import { EstructuraModel } from '../../models/EstructuraModel';
import { Boton } from '../boton/boton';
import { ArchivoService } from '../../services/archivo-service';
import { ContenidoArchivo } from '../../models/ContenidoArchivo';
import { HttpErrorResponse } from '@angular/common/http';
import { Informacion } from '../../services/informacion';
import { extraerMensajeError } from '../../class/MensajeError';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editor',
  imports: [Boton, FormsModule],
  templateUrl: './editor.html',
  styleUrl: './editor.css',
})
export class Editor implements AfterViewInit {
  archivo = input.required<EstructuraModel | undefined>();
  contenido = model<string>('');
  lineaActual = signal<number>(1);
  columnaActual = signal<number>(1);
  private _archivoS = inject(ArchivoService);
  private _info = inject(Informacion);

  @ViewChild('editorTextarea') textareaRef!: ElementRef<HTMLTextAreaElement>;

  ngAfterViewInit() {
    this.actualizarPosicionCursor();
  }

  actualizarPosicionCursor() {
    const textarea = this.textareaRef?.nativeElement;
    if (!textarea) return;

    const cursorPos = textarea.selectionStart;
    const texto = textarea.value;

    const textoHastaCursor = texto.substring(0, cursorPos);
    const lineas = textoHastaCursor.split('\n');
    this.lineaActual.set(lineas.length);
    this.columnaActual.set(lineas[lineas.length - 1].length + 1);
  }

  onCursorChange() {
    this.actualizarPosicionCursor();
  }

  guardar() {
    if (!this.archivo()) return;
    const contenido: ContenidoArchivo = {
      contenido: this.contenido(),
      rutaArchivo: this.archivo()!.ruta,
    };
    this._archivoS.actualizarContenido(contenido).subscribe({
      next: () => {},
      error: (error: HttpErrorResponse) => {
        this._info.mostrarError(extraerMensajeError(error, 'error al guardar intente más tarde'));
      },
    });
  }
}
