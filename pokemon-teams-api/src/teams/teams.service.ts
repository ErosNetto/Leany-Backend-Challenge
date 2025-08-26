import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PokeApiService } from '../poke-api/poke-api.service';
import { AddPokemonDto } from './dto/add-pokemon.dto';
import { CreateTeamDto } from './dto/create-team.dto';
import { PokemonDetailsDto } from './dto/pokemon-details.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamPokemon } from './entities/team-pokemon.entity';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(TeamPokemon)
    private readonly teamPokemonRepository: Repository<TeamPokemon>,
    private readonly pokeApiService: PokeApiService,
  ) {}

  // --- MÉTODOS CRUD PARA 'TEAM' ---

  create(createTeamDto: CreateTeamDto): Promise<Team> {
    // Para uma aplicação real, seria bom verificar se o trainerId existe.
    // Para este desafio, seguimos a simplicidade.
    const team = this.teamRepository.create(createTeamDto);
    return this.teamRepository.save(team);
  }

  findAllByTrainer(trainerId: string): Promise<Team[]> {
    return this.teamRepository.find({
      where: { trainerId },
    });
  }

  async findOne(id: string): Promise<Team> {
    const team = await this.teamRepository.findOne({
      where: { id },
      relations: ['pokemons'], // Carrega os pokémons associados
    });
    if (!team) {
      throw new NotFoundException(`Team with ID "${id}" not found`);
    }
    return team;
  }

  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    const team = await this.teamRepository.preload({
      id,
      ...updateTeamDto,
    });
    if (!team) {
      throw new NotFoundException(`Team with ID "${id}" not found`);
    }
    return this.teamRepository.save(team);
  }

  async remove(id: string): Promise<void> {
    const result = await this.teamRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Team with ID "${id}" not found`);
    }
  }

  // --- MÉTODOS PARA GERENCIAR POKÉMON NO TIME ---

  async addPokemon(
    teamId: string,
    addPokemonDto: AddPokemonDto,
  ): Promise<TeamPokemon> {
    const team = await this.findOne(teamId); // Reutiliza o método findOne

    if (team.pokemons.length >= 6) {
      throw new BadRequestException('Team is full (max 6 Pokémon)');
    }

    // Valida se o Pokémon existe na PokéAPI
    await this.pokeApiService.findPokemon(addPokemonDto.pokemonIdOrName);

    const newTeamPokemon = this.teamPokemonRepository.create({
      teamId,
      pokemonIdOrName: addPokemonDto.pokemonIdOrName.toLowerCase(), // Padroniza para minúsculas
    });

    return this.teamPokemonRepository.save(newTeamPokemon);
  }

  async removePokemon(teamId: string, teamPokemonId: string): Promise<void> {
    // A query de delete já garante que o pokémon pertence ao time correto
    const result = await this.teamPokemonRepository.delete({
      id: teamPokemonId,
      teamId: teamId,
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Pokemon with ID "${teamPokemonId}" not found in team "${teamId}"`,
      );
    }
  }

  async listPokemons(teamId: string): Promise<PokemonDetailsDto[]> {
    const team = await this.findOne(teamId); // Reutiliza o método findOne

    if (team.pokemons.length === 0) {
      return [];
    }

    // Busca os detalhes de cada Pokémon em paralelo
    const pokemonDetailsPromises = team.pokemons.map((p) =>
      this.pokeApiService.findPokemon(p.pokemonIdOrName),
    );

    const resolvedPokemons = await Promise.all(pokemonDetailsPromises);

    // Mapeia para o nosso DTO de resposta, incluindo o ID da nossa entidade local
    return resolvedPokemons.map((data, index) => ({
      // Adicionamos o ID da nossa tabela 'team_pokemon' para facilitar a remoção no front-end
      teamPokemonId: team.pokemons[index].id,
      id: data.id,
      name: data.name,
      types: data.types.map((typeInfo: any) => typeInfo.type.name),
      sprite: data.sprites.front_default,
    }));
  }
}
