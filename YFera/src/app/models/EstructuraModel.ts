export interface EstructuraModel {
  nombre: string;
  ruta: string;
  carpeta: boolean;
  hijos: EstructuraModel[];
}