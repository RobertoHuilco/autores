import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Autores } from "./autores.entity";

@Entity()
export class Libros {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    titulo: string;

    @Column('text')
    categoria: string;

    @Column('text')
    pais: string;

    @Column('int', {
        default: 0,
    })
    yearpublic: number;

    @BeforeInsert()
    async beforeInsert() {
        
        console.log('Antes de insertar datos en la tabla Alumno...');
        this.validateData(); 
    }

    @BeforeUpdate()
    async beforeUpdate() {
        
        console.log('Antes de actualizar datos en la tabla Alumno...');
        this.validateData(); 
    }

    private validateData() {
        if (this.yearpublic < 0) {
            console.error('Error: El año de publicación no puede ser un número negativo.');
            throw new Error('El año de publicación no puede ser un número negativo.');
        }

        
    }

    //RELACION DEL ESTUDIANTE AL COMENTARIOS

@OneToMany(
()=>Autores,
(autores)=>autores.libros,
{
    cascade:true,
    eager:true
} 
)
autorlibro?:Autores[]
}
