import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../api';
import { ArchivoCrearModel } from '../models/ArchivoCrearModel';
import { Observable } from 'rxjs';
import { ContenidoCarga } from '../models/ContenidoCarga';
import { ContenidoArchivo } from '../models/ContenidoArchivo';

@Injectable({
  providedIn: 'root',
})
export class ArchivoService {
  private _http = inject(HttpClient);
  private url = `${API_URL}/archivo`;

  crearArchivo(archivo: ArchivoCrearModel): Observable<void> {
    return this._http.post<void>(`${this.url}`, archivo);
  }

  obtenerArchivo(archivoRuta: string): Observable<ContenidoCarga> {
    return this._http.get<ContenidoCarga>(`${this.url}?ruta=${archivoRuta}`);
  }

  eliminarArchivo(archivoRuta: string): Observable<void> {
    return this._http.delete<void>(`${this.url}?ruta=${archivoRuta}`);
  }

  actualizarContenido(contenido: ContenidoArchivo) {
    return this._http.patch<void>(`${this.url}`, contenido);
  }
}
