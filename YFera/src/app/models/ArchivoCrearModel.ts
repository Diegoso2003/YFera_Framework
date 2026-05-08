export enum TipoArchivo {
  CARPETA,
  STYLES,
  COMPONENT,
  PRINCIPAL,
}

export interface ArchivoCrearModel {
  nombre: string;
  carpeta: string;
  tipo: TipoArchivo;
}
