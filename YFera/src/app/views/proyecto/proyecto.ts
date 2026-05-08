import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Informacion } from '../../services/informacion';
import { ProyectoService } from '../../services/proyecto-service';
import { EstructuraModel } from '../../models/EstructuraModel';
import { HttpErrorResponse } from '@angular/common/http';
import { extraerMensajeError } from '../../class/MensajeError';
import { Archivo } from "../../components/archivo/archivo";
import { Editor } from "../../components/editor/editor";
import { CrearArchivo } from "../../components/crear-archivo/crear-archivo";
import { EliminarArchivo } from "../../components/eliminar-archivo/eliminar-archivo";
import { ArchivoService } from '../../services/archivo-service';
import { ContenidoCarga } from '../../models/ContenidoCarga';
import { Boton } from "../../components/boton/boton";

@Component({
  selector: 'app-proyecto',
  imports: [Archivo, Editor, CrearArchivo, EliminarArchivo, Boton],
  templateUrl: './proyecto.html',
  styleUrl: './proyecto.css',
})
export class Proyecto implements OnInit {
  private _route = inject(ActivatedRoute);
  private _info = inject(Informacion);
  private _proyectS = inject(ProyectoService);
  private _archivoS = inject(ArchivoService);
  nombreProyecto = signal<string>('');
  proyecto = signal<EstructuraModel | undefined>(undefined);
  archivoActual = signal<EstructuraModel | undefined>(undefined);
  contenidoArchivo = signal<string>('');
  mostrarCrear = signal<boolean>(false);
  mostrarEliminar = signal<boolean>(false);
  archivoSeleccionado= signal<EstructuraModel | null>(null);

  ngOnInit(): void {
    this.nombreProyecto.set(this._route.snapshot.paramMap.get('nombre') ?? '');
    this.obtenerDatos();
  }

  obtenerDatos(): void {
    this._proyectS.obtenerProyecto(this.nombreProyecto()).subscribe({
      next: (proyecto: EstructuraModel) => {
        this.proyecto.set(proyecto);
      },
      error: (error: HttpErrorResponse) => {
        this._info.mostrarError(
          extraerMensajeError(error, 'Error al obtener el proyecto intente más tarde'),
        );
      },
    });
  }

  abrirArchivo(archivo: EstructuraModel) {
    if(archivo.carpeta) return;
    this.archivoActual.set(archivo)
    this._archivoS.obtenerArchivo(archivo.ruta).subscribe({
      next: (contenido: ContenidoCarga) => {
        this.contenidoArchivo.set(contenido.contenido)
      },
      error: (error:HttpErrorResponse) => {
        this._info.mostrarError(extraerMensajeError(error, 'error al eliminar intente más tarde'))
      }
    })
  }

  abrirCrear(archivo: EstructuraModel){
    this.archivoSeleccionado.set(archivo);
    this.mostrarCrear.set(true);
  }

  abrirEliminar(archivo: EstructuraModel) {
    this.archivoSeleccionado.set(archivo);
    this.mostrarEliminar.set(true);
  }

  creado() {
    this.mostrarCrear.set(false);
    this.obtenerDatos();
  }

  eliminado() {
    if(this.archivoActual()?.ruta === this.archivoSeleccionado()?.ruta){
      this.archivoActual.set(undefined);
      this.contenidoArchivo.set('');
    }

    this.mostrarEliminar.set(false);
    this.obtenerDatos();
  }

  descargarArbol() {
    this._proyectS.descargarArbolDeTrabajo(this.nombreProyecto()).subscribe({
      next: (blob) => {
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'arbol-trabajo.zip';
        link.click();
        URL.revokeObjectURL(downloadUrl);
      },
      error: (error) => {
        console.error('Error al descargar:', error);
      }
    })
  }

  compilar() {
    this._proyectS.compilar(this.nombreProyecto()).subscribe({
      next: () => {

      },
      error: (error: HttpErrorResponse) => {
        this._info.mostrarError(extraerMensajeError(error, 'error al compilar intente más tarde'))
      }
    });
  }
}
