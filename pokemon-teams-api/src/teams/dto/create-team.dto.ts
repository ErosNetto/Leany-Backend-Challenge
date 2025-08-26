import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({
    description: 'O nome do time',
    example: 'Time Kanto',
    minLength: 3,
    maxLength: 30,
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  nomeDoTime: string;

  @ApiProperty({
    description: 'O UUID do treinador dono do time',
    example: 'b9a7c3d4-3f1e-4a9b-8b1e-2e4d6c8a7b3c',
  })
  @IsUUID()
  trainerId: string;
}
