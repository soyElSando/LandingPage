export interface Experiencia {
    idExp?: number;
    puestoEs: string;
    puestoEn: string;    
    Empresa: string ;
    logoEmpresa: string ;
    inicio: string ;
    fin: string ;
}

export interface ExperienciaWithId extends Experiencia {
    idExp: number;
}