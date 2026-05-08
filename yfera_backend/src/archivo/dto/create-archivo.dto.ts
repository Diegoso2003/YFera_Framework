import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator';

export enum TipoArchivo {
  CARPETA = 'CARPETA',
  STYLES = 'STYLES',
  COMPONENT = 'COMPONENT',
  PRINCIPAL = 'PRINCIPAL',
}

export class CreateArchivoDto {
  @IsString({ message: 'Envie un nombre valido para el archivo' })
  @Transform(({ value }) => (value as string).trim())
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @Matches(/^[a-zA-Z0-9_\- ]+$/, {
    message: 'el nombre solo acepta letras, números, espacios, guion y guion bajo',
  })
  nombre!: string;
  @IsString({ message: 'Envie una ruta valida' })
  @IsNotEmpty({ message: 'Envie una ruta valida' })
  carpeta!: string;
  @IsEnum(TipoArchivo, { message: 'Envie un tipo de archivo valido' })
  tipo!: TipoArchivo;
}
