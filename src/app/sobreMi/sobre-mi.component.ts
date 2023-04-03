import { Component } from '@angular/core';
import { SobreMi } from '../models/SobreMi.model';
import { LanguageService } from '../Shared/services/language.service';
import { SobreMiService } from './sobre-mi.service';
import I18n from 'src/assets/I18n.json'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css']
})
export class SobreMiComponent {
  datos: SobreMi ={
    "nombre": "Germán Sandoval",
    "email": "argentina@programa.com",
    "password": "1234",
    "profesion": "Desarrolladora Full Stack Jr.",
    "linkIn": "https://www.linkedin.com/in/leticia-portillo-b62ba3103/",
    "linkMail":"/contacto",
    "linkWP":"",
    "linkGH": "https://github.com/soyElSando",
    "linkIG":"https://instagram.com/ger.sando",
    "descripcionEs": "La <strong>diversidad</strong> en la formación, en el trabajo y en los intereses es algo pasado de moda. Hoy no está bien visto porque se tiende a pensar que se es 'poco especialista'. Sin embargo, es algo de mi persona que valoro mucho. Admito ante la mirada del lector que mi formación es diversa en distintas áreas. Cuando digo áreas diversas digo artes, electrónica, redes, administración y digo desarrollo de software (por supuesto).",
    "descripcionEn": "lorem ipsum dolor sit amet, consectetur adip",
    "avatar": "assets/gerSando.jpg"
}
  constructor(private SobreMiService: SobreMiService, private languageService:LanguageService) {
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
  
  idiomaEspanol:boolean =true
  titulos = I18n.seccion
  esEspanolSub: Subscription = new Subscription;
  
}