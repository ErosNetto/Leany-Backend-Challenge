import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class AddPokemonDto {
  @ApiProperty({
    description:
      'O nome ou ID numérico do Pokémon na PokéAPI (ex: "pikachu" ou 25)',
    example: 'ditto',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  pokemonIdOrName: string;
}
