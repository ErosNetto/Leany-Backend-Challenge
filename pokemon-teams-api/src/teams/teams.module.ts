import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { Team } from './entities/team.entity';
import { TeamPokemon } from './entities/team-pokemon.entity';
import { PokeApiModule } from '../poke-api/poke-api.module';

@Module({
  imports: [TypeOrmModule.forFeature([Team, TeamPokemon]), PokeApiModule],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
