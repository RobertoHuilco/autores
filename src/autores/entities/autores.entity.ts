import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Libros } from "./libros.entity";

@Entity()
export class Autores {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    nombre: string;

    

@ManyToOne(
    ()=>Libros,
    (libros)=>libros.autorlibro
)
libros?:Libros

    
}
