export interface CategoriaEducacion{
    idCatEdu?: number;
    nombreCatEdu: {
        es: string;
        en: string;
    };
}

export interface CategoriaEducacionWithId extends CategoriaEducacion{
    idCatEdu: number;
}