import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class PokeApiService {
  private readonly baseUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.baseUrl =
      process.env.POKE_API_URL || 'https://pokeapi.co/api/v2/pokemon/';
  }

  async findPokemon(idOrName: string | number): Promise<any> {
    const url = `${this.baseUrl}${String(idOrName).toLowerCase()}`;

    const { data } = await firstValueFrom(
      this.httpService.get<any>(url).pipe(
        catchError(() => {
          throw new NotFoundException(
            `Pokémon com id ou nome "${idOrName}" não foi encontrado na PokéAPI`,
          );
        }),
      ),
    );

    return data;
  }
}
