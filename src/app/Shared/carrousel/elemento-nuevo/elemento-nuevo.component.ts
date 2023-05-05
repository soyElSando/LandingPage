import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Carrousel } from 'src/app/models/Carrousel.model';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/Shared/services/language.service';
import I18n from 'src/assets/I18n.json';

@Component({
  selector: 'app-elemento-nuevo',
  templateUrl: './elemento-nuevo.component.html',
  styleUrls: ['./elemento-nuevo.component.css']
})
export class ElementoNuevoComponent implements OnInit {

  nombreEsElemNuevo: String = "";
  nombreEnElemNuevo: String = "";
  descripcionEsElemNuevo: String = "";
  descripcionEnElemNuevo: String = "";
  imagenElemNuevo: String = "";
  linkElemNuevo: String = "";
  idiomaEspanol:boolean =true
  esEspanolSub: Subscription = new Subscription;
  textos:any={es:"",en:""}
  botones = I18n.boton

  @Input() servicio: any;
  @Output() onCreateEvent = new EventEmitter();

  constructor(private languageService:LanguageService) { }


  ngOnInit(): void {
    this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
      this.idiomaEspanol = isAuthenticated
    })

    this.textos= this.servicio.getName()
  }

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }

  onCreate() {

    const { nombreEsElemNuevo, nombreEnElemNuevo, descripcionEsElemNuevo, descripcionEnElemNuevo,
      linkElemNuevo, imagenElemNuevo } = this;
    const nuevoElemento: Carrousel = { nombreEs: nombreEsElemNuevo, nombreEn: nombreEnElemNuevo,
       descripcionEs: descripcionEsElemNuevo, descripcionEn: descripcionEnElemNuevo, link: linkElemNuevo,
        imagen: imagenElemNuevo };
    this.servicio.createElemento(nuevoElemento).subscribe(() => {

      this.onCreateEvent.emit();
      this.nombreEsElemNuevo = "";
      this.descripcionEsElemNuevo = "";
      this.nombreEnElemNuevo = "";
      this.descripcionEnElemNuevo = "";
      this.imagenElemNuevo = "";
      this.linkElemNuevo = "";
    }, () => {
      alert(this.idiomaEspanol ? "Algo salió mal" : "Something went wrong")
    }
    );

  }

}


