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
  constructor(private SobreMiService: SobreMiService, private languageService:LanguageService) { }
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
  datos:SobreMi= this.SobreMiService.getSobreMi()
  esEspanolSub: Subscription = new Subscription;
  
}
