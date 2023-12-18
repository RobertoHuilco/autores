import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comentarios } from "./comentarios.entity";

@Entity()
export class Estudiantes {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    nombres: string;

    @Column('text')
    apellidos: string;

    @Column('int', {
        default: 0,
    })
    edad: number;

    @Column('text')
    cinturon: string;

    @Column('text')
    correo: string;

    @Column('date')
    fecha_inscripcion: Date;

    @Column('text')
    clave: string;

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
        if (this.edad < 0) {
            console.error('Error: La edad no puede ser un número negativo.');
            throw new Error('La edad no puede ser un número negativo.');
        }

        
    }

    //RELACION DEL ESTUDIANTE AL COMENTARIOS

@OneToMany(
()=>Comentarios,
(comentarios)=>comentarios.estudiantes,
{
    cascade:true,
    eager:true
} 
)
comentariosestudiantes?:Comentarios[]
}
