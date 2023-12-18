import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Estudiantes } from "./estudiantes.entity";

@Entity()
export class Comentarios {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    descripcion: string;

    

@ManyToOne(
    ()=>Estudiantes,
    (estudiantes)=>estudiantes.comentariosestudiantes
)
estudiantes?:Estudiantes

    
}
