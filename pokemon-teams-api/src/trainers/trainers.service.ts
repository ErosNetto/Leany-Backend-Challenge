import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { Trainer } from './entities/trainer.entity';

@Injectable()
export class TrainersService {
  constructor(
    @InjectRepository(Trainer)
    private readonly trainerRepository: Repository<Trainer>,
  ) {}

  async create(createTrainerDto: CreateTrainerDto): Promise<Trainer> {
    const trainer = this.trainerRepository.create(createTrainerDto);
    try {
      return await this.trainerRepository.save(trainer);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('O nome do treinador já está em uso.');
      }
      throw error;
    }
  }

  findAll(): Promise<Trainer[]> {
    return this.trainerRepository.find();
  }

  async findOne(id: string): Promise<Trainer> {
    const trainer = await this.trainerRepository.findOneBy({ id });
    if (!trainer) {
      throw new NotFoundException(`Treinador com ID "${id}" não encontrado`);
    }
    return trainer;
  }

  async findOneByNome(nome: string): Promise<Trainer | null> {
    return this.trainerRepository.findOneBy({ nome });
  }

  async update(
    id: string,
    updateTrainerDto: UpdateTrainerDto,
  ): Promise<Trainer> {
    const trainer = await this.trainerRepository.preload({
      id,
      ...updateTrainerDto,
    });
    if (!trainer) {
      throw new NotFoundException(`Treinador com ID "${id}" não encontrado`);
    }
    return this.trainerRepository.save(trainer);
  }

  async remove(id: string): Promise<void> {
    const result = await this.trainerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Treinador com ID "${id}" não encontrado`);
    }
  }
}
