import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddPokemonDto } from './dto/add-pokemon.dto';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamsService } from './teams.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Teams')
@UseGuards(JwtAuthGuard)
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  // --- ENDPOINTS CRUD PARA 'TEAM' ---

  @Post()
  @ApiOperation({ summary: 'Create a new team for a trainer' })
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Get('by-trainer/:trainerId')
  @ApiOperation({ summary: 'List all teams for a specific trainer' })
  findAllByTrainer(@Param('trainerId', ParseUUIDPipe) trainerId: string) {
    return this.teamsService.findAllByTrainer(trainerId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single team by its ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.teamsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Update a team's name" })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ) {
    return this.teamsService.update(id, updateTeamDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a team' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.teamsService.remove(id);
  }

  // --- ENDPOINTS PARA GERENCIAR POKÉMON NO TIME ---

  @Post(':teamId/pokemons')
  @ApiOperation({ summary: 'Add a Pokémon to a team' })
  addPokemon(
    @Param('teamId', ParseUUIDPipe) teamId: string,
    @Body() addPokemonDto: AddPokemonDto,
  ) {
    return this.teamsService.addPokemon(teamId, addPokemonDto);
  }

  @Delete(':teamId/pokemons/:teamPokemonId')
  @ApiOperation({ summary: 'Remove a Pokémon from a team' })
  removePokemon(
    @Param('teamId', ParseUUIDPipe) teamId: string,
    @Param('teamPokemonId', ParseUUIDPipe) teamPokemonId: string,
  ) {
    return this.teamsService.removePokemon(teamId, teamPokemonId);
  }

  @Get(':teamId/pokemons')
  @ApiOperation({ summary: 'List all Pokémon in a team with their details' })
  listPokemons(@Param('teamId', ParseUUIDPipe) teamId: string) {
    return this.teamsService.listPokemons(teamId);
  }
}
