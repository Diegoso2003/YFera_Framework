import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateProyectoDto {
  @IsString({ message: 'Envie un nombre valido para el proyecto' })
  @Transform(({ value }) => (value as string).trim())
  @IsNotEmpty({ message: 'No puede estar vacío' })
  @Matches(/^[a-zA-Z0-9_\- ]+$/, {
    message: 'el nombre solo acepta letras, números, espacios, guion y guion bajo',
  })
  nombre!: string;
}
