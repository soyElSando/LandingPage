import { Component } from '@angular/core';
import { SobreMi } from './SobreMi.model';
import { LanguageService } from '../Shared/services/language.service';
import { SobreMiService } from './sobre-mi.service';
import I18n from 'src/assets/I18n.json'
import { Subscription } from 'rxjs';
import { LoginService } from '../Shared/services/login.service';


@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css']
})
export class SobreMiComponent {

  idiomaEspanol:boolean =true
  titulos = I18n.seccion
  esEspanolSub: Subscription = new Subscription;
  datos: SobreMi ={
    "nombre": "Germán Sandoval",
    "email": "",
    // "password": "1234",
    "profesion": "Desarrollador Full Stack Jr.",
    "linkIn": "",
    // "linkMail":"/contacto",
    "linkWP":"",
    "linkGH": "",
    "linkIG":"",
    "descripcionEs": "vacío",
    "descripcionEn": "void",
    "avatar": "assets/gerSando.jpg"
}
  constructor(private SobreMiService: SobreMiService, private languageService:LanguageService, private loginService:LoginService) {
    
    this.SobreMiService.getSobreMi().subscribe(data => {
      
      this.datos = data;

    } );
   }
  ngOnInit() {
    this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
      this.idiomaEspanol = isAuthenticated
    })

    
  }

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }
  
  renderizar(){
    this.SobreMiService.getSobreMi().subscribe(data => {
      this.datos = data;
  })}

  estaLogueado(){
    return this.loginService.isLoggedIn();
  }
}
