import { CategoriaSkillWithId } from "./CategoriaSkill.model";

export interface Skill{
    idSkill?: number;
    nombreSkill: string ;    
    avance: number ;
    catSkill: CategoriaSkillWithId ;
}

export interface SkillWithId extends Skill{
    idSkill: number;
}