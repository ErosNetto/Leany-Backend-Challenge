import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TrainersService } from 'src/trainers/trainers.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private trainersService: TrainersService,
    private jwtService: JwtService,
  ) {}

  async validateTrainer(nome: string, pass: string): Promise<any> {
    const trainer = await this.trainersService.findOneByNome(nome);
    if (trainer && (await bcrypt.compare(pass, trainer.password))) {
      const { password, ...result } = trainer;
      return result;
    }
    return null;
  }

  async login(trainer: any) {
    const payload = { nome: trainer.nome, sub: trainer.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
