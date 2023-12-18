import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibrosController } from './libros.controller';
import { LibroService } from './libros.service';
import { Libros } from './entities/libros.entity';
import { Autores } from './entities/autores.entity';

@Module({
  controllers: [LibrosController],
  providers: [LibroService],
  imports:[
    TypeOrmModule.forFeature([Libros]),
    TypeOrmModule.forFeature([Autores]),

  ]
})
export class LibrosModule {}
