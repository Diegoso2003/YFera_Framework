import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../api';
import { Observable } from 'rxjs';
import { ProyectoModel } from '../models/ProyectoModel';
import { EstructuraModel } from '../models/EstructuraModel';
import { ArchivoErrores } from '../models/ArchivoErrores';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  private _http = inject(HttpClient);
  private url = `${API_URL}/proyecto`;
  constructor() {}

  obtenerProyectos(): Observable<string[]> {
    return this._http.get<string[]>(`${this.url}`);
  }

  crearProyecto(nuevo: ProyectoModel): Observable<ProyectoModel> {
    return this._http.post<ProyectoModel>(`${this.url}`, nuevo);
  }

  obtenerProyecto(proyecto: string): Observable<EstructuraModel> {
    return this._http.get<EstructuraModel>(`${this.url}/${proyecto}`);
  }

  descargarArbolDeTrabajo(proyecto: string): Observable<Blob> {
    return this._http.get(`${this.url}/arbol/${proyecto}`, { responseType: 'blob'  });
  }

  compilar(proyecto: string): Observable<ArchivoErrores[]> {
    return this._http.get<ArchivoErrores[]>(`${this.url}/compilar/${proyecto}`);
  }
}
