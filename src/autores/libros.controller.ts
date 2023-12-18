import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PaginacionDto } from 'src/common/dto/paginacion.dto';
import { LibroService } from './libros.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';

@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibroService) {}

  @Post()
  create(@Body() createLibroDto: CreateLibroDto) {
    return this.librosService.create(createLibroDto);

  }

  @Get()
  findAll(@Query() paginacionDto: PaginacionDto) {
    return this.librosService.findAll(paginacionDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.librosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlumnoDto: UpdateLibroDto) {
    return this.librosService.update(+id, updateAlumnoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.librosService.remove(+id);
  }
}
