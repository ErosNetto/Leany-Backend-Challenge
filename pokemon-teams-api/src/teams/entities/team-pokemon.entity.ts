import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Team } from './team.entity';

@Entity()
export class TeamPokemon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pokemonIdOrName: string;

  @ManyToOne(() => Team, (team) => team.pokemons, { onDelete: 'CASCADE' })
  team: Team;

  @Column()
  teamId: string;
}
