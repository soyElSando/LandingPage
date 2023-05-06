export interface CategoriaSkill{
    idCatSkill?: number;
    nombreCatSkillEs: string;
    nombreCatSkillEn: string;
}

export interface CategoriaSkillWithId extends CategoriaSkill{
    idCatSkill: number;
}