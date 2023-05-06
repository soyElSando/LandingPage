import { CategoriaSkill } from "./CategoriaSkill.model";

export interface Skill{
    idSkill?: number;
    nombreSkill: string ;    
    avance: number ;
    catSkill: number ;
}

export interface SkillWithID extends Skill{
    idSkill: number;
}