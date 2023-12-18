import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsPositive, IsString } from "class-validator";


export class CreateAlumnoDto {

   

    @IsString()
    @IsOptional()
    nombres?: string

    @IsString()
    @IsOptional()
    apellidos?: string

    @IsInt()
    
    @IsOptional()
    @Type(  ()=> Number)
    edad?: number


    @IsString()
    @IsOptional()
    cinturon?: string

    

    @IsString()
    @IsOptional()
    correo?: string


    @IsString()
    @IsOptional()
    fecha_inscripcion?: Date

    @IsString()
    @IsOptional()
    clave?: string



    // dto de la relacion

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    comentariosestudiantes?: string[]

}
