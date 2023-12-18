import { Module } from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { AlumnosController } from './alumnos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiantes } from './entities/estudiantes.entity';
import { Comentarios} from './entities/comentarios.entity';

@Module({
  controllers: [AlumnosController],
  providers: [AlumnosService],
  imports:[
    TypeOrmModule.forFeature([Estudiantes]),
    TypeOrmModule.forFeature([Comentarios]),

  ]
})
export class AlumnosModule {}
