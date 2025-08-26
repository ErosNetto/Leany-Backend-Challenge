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

  @Post()
  @ApiOperation({ summary: 'Criar um novo time para um treinador' })
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Get('by-trainer/:trainerId')
  @ApiOperation({ summary: 'Listar todos os times de um treinador específico' })
  findAllByTrainer(@Param('trainerId', ParseUUIDPipe) trainerId: string) {
    return this.teamsService.findAllByTrainer(trainerId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um time pelo ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.teamsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar o nome de um time' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ) {
    return this.teamsService.update(id, updateTeamDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um time' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.teamsService.remove(id);
  }

  @Post(':teamId/pokemons')
  @ApiOperation({ summary: 'Adicionar um Pokémon ao time' })
  addPokemon(
    @Param('teamId', ParseUUIDPipe) teamId: string,
    @Body() addPokemonDto: AddPokemonDto,
  ) {
    return this.teamsService.addPokemon(teamId, addPokemonDto);
  }

  @Delete(':teamId/pokemons/:teamPokemonId')
  @ApiOperation({ summary: 'Remover um Pokémon do time' })
  removePokemon(
    @Param('teamId', ParseUUIDPipe) teamId: string,
    @Param('teamPokemonId', ParseUUIDPipe) teamPokemonId: string,
  ) {
    return this.teamsService.removePokemon(teamId, teamPokemonId);
  }

  @Get(':teamId/pokemons')
  @ApiOperation({ summary: 'Listar todos os Pokémon de um time com detalhes' })
  listPokemons(@Param('teamId', ParseUUIDPipe) teamId: string) {
    return this.teamsService.listPokemons(teamId);
  }
}
