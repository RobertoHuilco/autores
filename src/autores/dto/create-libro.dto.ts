import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsPositive, IsString } from "class-validator";


export class CreateLibroDto {

   

    @IsString()
    @IsOptional()
    titulo?: string

    @IsString()
    @IsOptional()
    categoria?: string

    @IsString()
    @IsOptional()
    pais?: string

    @IsInt()
    
    @IsOptional()
    @Type(  ()=> Number)
    yearpublic?: number
    
    // dto de la relacion

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    autorlibro?: string[]

}
