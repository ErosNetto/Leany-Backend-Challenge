import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Length,
  MinLength,
} from 'class-validator';

export class CreateTrainerDto {
  @ApiProperty({
    description: 'O nome do treinador',
    example: 'Ash Ketchum',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  nome: string;

  @ApiProperty({
    description: 'A senha do treinador (mínimo 8 caracteres)',
    example: 'senhaForte123',
    minLength: 8,
  })
  @IsString()
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'A cidade de origem do treinador (opcional)',
    example: 'Pallet Town',
    required: false,
  })
  @IsOptional()
  @IsString()
  cidadeOrigem?: string;
}
