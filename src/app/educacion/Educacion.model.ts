export interface Educacion{
    idEdu?:number;
    institucion: string ;
    logoInstitucion: string ;
    tituloEs: string ;
    tituloEn: string ;
    descripcionEs: string ;
    descripcionEn: string ;
    inicio: string ;
    fin: string ; 
    catEdu: number;
}
export interface EducacionWhitId extends Educacion{
    idEdu:number;
}