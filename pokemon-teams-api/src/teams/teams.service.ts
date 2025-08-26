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

  create(createTeamDto: CreateTeamDto): Promise<Team> {
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
      relations: ['pokemons'],
    });
    if (!team) {
      throw new NotFoundException(`Time com ID "${id}" não encontrado`);
    }
    return team;
  }

  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    const team = await this.teamRepository.preload({
      id,
      ...updateTeamDto,
    });
    if (!team) {
      throw new NotFoundException(`Time com ID "${id}" não encontrado`);
    }
    return this.teamRepository.save(team);
  }

  async remove(id: string): Promise<void> {
    const result = await this.teamRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Time com ID "${id}" não encontrado`);
    }
  }

  async addPokemon(
    teamId: string,
    addPokemonDto: AddPokemonDto,
  ): Promise<TeamPokemon> {
    const team = await this.findOne(teamId);

    if (team.pokemons.length >= 6) {
      throw new BadRequestException('Time está cheio (máx. 6 Pokémons)');
    }

    await this.pokeApiService.findPokemon(addPokemonDto.pokemonIdOrName);

    const newTeamPokemon = this.teamPokemonRepository.create({
      teamId,
      pokemonIdOrName: addPokemonDto.pokemonIdOrName.toLowerCase(),
    });

    return this.teamPokemonRepository.save(newTeamPokemon);
  }

  async removePokemon(teamId: string, teamPokemonId: string): Promise<void> {
    const result = await this.teamPokemonRepository.delete({
      id: teamPokemonId,
      teamId: teamId,
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Pokémon com ID "${teamPokemonId}" não encontrado no time "${teamId}""`,
      );
    }
  }

  async listPokemons(teamId: string): Promise<PokemonDetailsDto[]> {
    const team = await this.findOne(teamId);

    if (team.pokemons.length === 0) {
      return [];
    }

    const pokemonDetailsPromises = team.pokemons.map((p) =>
      this.pokeApiService.findPokemon(p.pokemonIdOrName),
    );

    const resolvedPokemons = await Promise.all(pokemonDetailsPromises);

    return resolvedPokemons.map((data, index) => ({
      teamPokemonId: team.pokemons[index].id,
      id: data.id,
      name: data.name,
      types: data.types.map((typeInfo: any) => typeInfo.type.name),
      sprite: data.sprites.front_default,
    }));
  }
}
