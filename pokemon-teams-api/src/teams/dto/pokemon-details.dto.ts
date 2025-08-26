import { ApiProperty } from '@nestjs/swagger';

export class PokemonDetailsDto {
  @ApiProperty({
    description:
      'O UUID da relação Pokémon-Time na nossa base de dados. Use este ID para remover o Pokémon.',
    example: 'f4a7c3d4-3f1e-4a9b-8b1e-2e4d6c8a7b3c',
  })
  teamPokemonId: string;

  @ApiProperty({
    description: 'O ID numérico do Pokémon na PokéAPI',
    example: 25,
  })
  id: number;

  @ApiProperty({
    description: 'O nome do Pokémon',
    example: 'pikachu',
  })
  name: string;

  @ApiProperty({
    description: 'Uma lista com os tipos do Pokémon',
    example: ['electric'],
  })
  types: string[];

  @ApiProperty({
    description: 'URL da imagem (sprite) do Pokémon',
    example:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  })
  sprite: string;
}
