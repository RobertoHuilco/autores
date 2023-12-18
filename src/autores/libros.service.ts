import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginacionDto } from 'src/common/dto/paginacion.dto';
import { Autores } from './entities/autores.entity';
import { Libros } from './entities/libros.entity';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';

@Injectable()
export class LibroService {
  //ESTA ES LA INJECCION DE LA BASE DE DATOS(ENTITY)
  constructor(
    @InjectRepository(Libros)
    private readonly producRepository: Repository<Libros>,
    @InjectRepository(Autores)
    private readonly librosRepository: Repository<Autores>,
    
    ) { }

  async create(createLibroDto: CreateLibroDto) {
    try {
      const {autorlibro=[], ...comentariodetalles} = createLibroDto

      const libros = this.producRepository.create(
        {
          ...comentariodetalles,
          autorlibro:autorlibro.map(autorlibro=>this.librosRepository.create({nombre:autorlibro}))
        }
      );
      await this.producRepository.save(libros);
      return {...libros, autorlibro};

    }
    catch (error) {
      console.log(error)
      throw new Error('NO SE PUDO REALIZAR EL INGRESO A LA BD')

    }
  }

  //TRAEMOS LOS DATOS MEDIANTE EL METODO GET

  async findAll(paginacionDto: PaginacionDto) {
    const { limit = 10, offset = 1 } = paginacionDto;
    const libros= await this.producRepository.find({
      take: limit,
      skip: offset,
      relations:{
        autorlibro:true
      }
    })

return libros.map( libro=>(
  {
    ...libro,
    comentariosestudiantes:libro.autorlibro.map(nombrep=>nombrep.nombre)
  }
))


    //return this.producRepository.find({})
  }




  // BUSCAR LOS DATOS MEDIANTE EL ID 

  async findOne(id: number) {
    const libros = await this.producRepository.findOneBy({ id })
    // MESNAJE CUANDO SE BUSQUE UN ID QUE NO EXISTA
    if (!libros)
      throw new NotFoundException(id)
    return libros;
  }



  async update(id: number, updateLibroDto: UpdateLibroDto) {
    const libros = await this.producRepository.preload({
      id: id,
      ...updateLibroDto,
      autorlibro: []
    })
    if (!libros)
      throw new NotFoundException("NO SE PUDO ELIMINAR");
    await this.producRepository.save(libros);
    return libros
  }


  //ELIMINAMOS DATOS MEDIANTE EL ID
  async remove(id: number) {
    const libro = await this.findOne(id);
    await this.producRepository.delete(id);
    return libro; // Puedes devolver el alumno eliminado si es necesario
  }
}
