import { Trainer } from '../../trainers/entities/trainer.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { TeamPokemon } from '../entities/team-pokemon.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nomeDoTime: string;

  @ManyToOne(() => Trainer, (trainer) => trainer.teams, { onDelete: 'CASCADE' })
  trainer: Trainer;

  @Column()
  trainerId: string;

  @OneToMany(() => TeamPokemon, (teamPokemon) => teamPokemon.team)
  pokemons: TeamPokemon[];
}
