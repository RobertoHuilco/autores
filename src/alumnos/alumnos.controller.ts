import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';

import { PaginacionDto } from 'src/common/dto/paginacion.dto';

@Controller('estudiantes')
export class AlumnosController {
  constructor(private readonly alumnosService: AlumnosService) {}

  @Post()
  create(@Body() createAlumnoDto: CreateAlumnoDto) {
    return this.alumnosService.create(createAlumnoDto);

  }

  @Get()
  findAll(@Query() paginacionDto: PaginacionDto) {
    return this.alumnosService.findAll(paginacionDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.alumnosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlumnoDto: UpdateAlumnoDto) {
    return this.alumnosService.update(+id, updateAlumnoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alumnosService.remove(+id);
  }
}
