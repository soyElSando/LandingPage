export interface Carrousel {
    id?: number;
    nombreEs: string ;
    nombreEn: string ;
    imagen: string ;
    descripcionEs: string ;
    descripcionEn: string ;
    link: string;
}

export interface CarrouselWithId extends Carrousel {
    id: number;
  }
  