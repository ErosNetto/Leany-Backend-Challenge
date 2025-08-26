import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Team } from '../../teams/entities/team.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class Trainer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nome: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  cidadeOrigem: string;

  @OneToMany(() => Team, (team) => team.trainer)
  teams: Team[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
