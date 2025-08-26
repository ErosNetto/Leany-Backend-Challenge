import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PokeApiService } from './poke-api.service';

@Module({
  imports: [HttpModule],
  providers: [PokeApiService],
  exports: [PokeApiService],
})
export class PokeApiModule {}
