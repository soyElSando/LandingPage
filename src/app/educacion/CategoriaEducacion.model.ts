export interface CategoriaEducacion{
    idCatEdu?: number;
    nombreCatEduEs: string;
    nombreCatEduEn: string;
}

export interface CategoriaEducacionWithId extends CategoriaEducacion{
    idCatEdu: number;
}