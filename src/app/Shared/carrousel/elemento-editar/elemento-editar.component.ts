import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Carrousel } from 'src/app/models/Carrousel.model';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/Shared/services/language.service';
import I18n from 'src/assets/I18n.json';

@Component({
  selector: 'app-elemento-editar',
  templateUrl: './elemento-editar.component.html',
  styleUrls: ['./elemento-editar.component.css']
})
export class ElementoEditarComponent implements OnInit {

  elementoAEditar?: Carrousel;
  nombreEsElemEditar: String = "";
  nombreEnElemEditar: String = "";
  descripcionEsElemEditar: String = "";
  descripcionEnElemEditar: String = "";
  imagenElemEditar: String = "";
  linkElemEditar: String | undefined;
  idiomaEspanol:boolean =true
  esEspanolSub: Subscription = new Subscription;
  textos:any={es:"",en:""}
  botones = I18n.boton

  @Input() servicio: any;
  @Input() itemID: number = 0;
  @Output() onEditEvent = new EventEmitter();

  constructor(private languageService:LanguageService) { }


  ngOnInit(): void {
    this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
      this.idiomaEspanol = isAuthenticated
    })

    this.textos= this.servicio.getName()

    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['itemID']) {
      this.servicio.getElements().subscribe(
        (data:Carrousel[])=>{this.elementoAEditar =data.find((elemento: Carrousel) => elemento.id == this.itemID)
        if(this.elementoAEditar){
          
          this.nombreEsElemEditar = this.elementoAEditar.nombreEs;
          this.nombreEnElemEditar = this.elementoAEditar.nombreEn;
          this.descripcionEsElemEditar = this.elementoAEditar.descripcionEs;
          this.descripcionEnElemEditar = this.elementoAEditar.descripcionEn;
          this.imagenElemEditar = this.elementoAEditar.imagen;
          this.linkElemEditar = this.elementoAEditar.link;
        }}
      )
    }}
  
  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }

  onEdit() {

    const { nombreEsElemEditar, nombreEnElemEditar, descripcionEsElemEditar, descripcionEnElemEditar,
      linkElemEditar, imagenElemEditar } = this;
    const elementoEditado: Carrousel = { nombreEs: nombreEsElemEditar, nombreEn: nombreEnElemEditar,
       descripcionEs: descripcionEsElemEditar, descripcionEn: descripcionEnElemEditar, link: linkElemEditar,
        imagen: imagenElemEditar };
    this.servicio.editElemento(elementoEditado).subscribe(() => {

      this.onEditEvent.emit();
      this.nombreEsElemEditar = "";
      this.descripcionEsElemEditar = "";
      this.nombreEnElemEditar = "";
      this.descripcionEnElemEditar = "";
      this.imagenElemEditar = "";
      this.linkElemEditar = "";
    }, () => {
      alert(this.idiomaEspanol ? "Algo salió mal" : "Something went wrong")
    }
    );

  }

}


