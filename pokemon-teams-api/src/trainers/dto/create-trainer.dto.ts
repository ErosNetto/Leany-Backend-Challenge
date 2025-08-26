import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';

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
    description: 'A cidade de origem do treinador (opcional)',
    example: 'Pallet Town',
    required: false,
  })
  @IsOptional()
  @IsString()
  cidadeOrigem?: string;
}
