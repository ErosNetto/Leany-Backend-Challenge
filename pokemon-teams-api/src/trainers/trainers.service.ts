import { Injectable, NotFoundException } from '@nestjs/common';
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

  create(createTrainerDto: CreateTrainerDto): Promise<Trainer> {
    const trainer = this.trainerRepository.create(createTrainerDto);
    return this.trainerRepository.save(trainer);
  }

  findAll(): Promise<Trainer[]> {
    return this.trainerRepository.find();
  }

  async findOne(id: string): Promise<Trainer> {
    const trainer = await this.trainerRepository.findOneBy({ id });
    if (!trainer) {
      throw new NotFoundException(`Trainer with ID "${id}" not found`);
    }
    return trainer;
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
      throw new NotFoundException(`Trainer with ID "${id}" not found`);
    }
    return this.trainerRepository.save(trainer);
  }

  async remove(id: string): Promise<void> {
    const result = await this.trainerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Trainer with ID "${id}" not found`);
    }
  }
}
