import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class Contenido {
  @IsString({ message: 'envie una ruta valida' })
  @Transform(({ value }) => (value as string).trim())
  @IsNotEmpty({ message: 'envie una ruta valida' })
  rutaArchivo!: string;
  @IsString({ message: 'envie un contenido valido' })
  contenido!: string;
}
