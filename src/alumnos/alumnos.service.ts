import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiantes } from './entities/estudiantes.entity';
import { Repository } from 'typeorm';
import { PaginacionDto } from 'src/common/dto/paginacion.dto';
import { Comentarios } from './entities/comentarios.entity';

@Injectable()
export class AlumnosService {
  //ESTA ES LA INJECCION DE LA BASE DE DATOS(ENTITY)
  constructor(
    @InjectRepository(Estudiantes)
    private readonly producRepository: Repository<Estudiantes>,
    @InjectRepository(Comentarios)
    private readonly cometariosRepository: Repository<Comentarios>,
    
    ) { }

  async create(createAlumnoDto: CreateAlumnoDto) {
    try {
      const {comentariosestudiantes=[], ...comentariodetalles} = createAlumnoDto

      const alumnos = this.producRepository.create(
        {
          ...comentariodetalles,
          comentariosestudiantes:comentariosestudiantes.map(comentariosestudiantes=>this.cometariosRepository.create({descripcion:comentariosestudiantes}))
        }
      );
      await this.producRepository.save(alumnos);
      return {...alumnos, comentariosestudiantes};

    }
    catch (error) {
      console.log(error)
      throw new Error('NO SE PUDO REALIZAR EL INGRESO A LA BD')

    }
  }

  //TRAEMOS LOS DATOS MEDIANTE EL METODO GET

  async findAll(paginacionDto: PaginacionDto) {
    const { limit = 10, offset = 1 } = paginacionDto;
    const alumnos= await this.producRepository.find({
      take: limit,
      skip: offset,
      relations:{
        comentariosestudiantes:true
      }
    })

return alumnos.map( alumno=>(
  {
    ...alumno,
    comentariosestudiantes:alumno.comentariosestudiantes.map(nombrep=>nombrep.descripcion)
  }
))


    //return this.producRepository.find({})
  }




  // BUSCAR LOS DATOS MEDIANTE EL ID 

  async findOne(id: number) {
    const alumnos = await this.producRepository.findOneBy({ id })
    // MESNAJE CUANDO SE BUSQUE UN ID QUE NO EXISTA
    if (!alumnos)
      throw new NotFoundException(id)
    return alumnos;
  }



  async update(id: number, updateAlumnoDto: UpdateAlumnoDto) {
    const alumnos = await this.producRepository.preload({
      id: id,
      ...updateAlumnoDto,
      comentariosestudiantes: []
    })
    if (!alumnos)
      throw new NotFoundException("NO SE PUDO ELIMINAR");
    await this.producRepository.save(alumnos);
    return alumnos
  }


  //ELIMINAMOS DATOS MEDIANTE EL ID
  async remove(id: number) {
    const alumno = await this.findOne(id);
    await this.producRepository.delete(id);
    return alumno; // Puedes devolver el alumno eliminado si es necesario
  }
}
