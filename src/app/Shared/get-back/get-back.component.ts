import { Component } from '@angular/core';
import { Location } from '@angular/common';
import I18n from 'src/assets/I18n.json'
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/Shared/services/language.service'


@Component({
  selector: 'app-get-back',
  templateUrl: './get-back.component.html',
  styleUrls: ['./get-back.component.css']
})
export class GetBackComponent {
  boton = I18n.boton
  idiomaEspanol:boolean =true
  esEspanolSub: Subscription = new Subscription;

  constructor(private location: Location, private languageService: LanguageService) {}

  ngOnInit() {
    this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
      this.idiomaEspanol = isAuthenticated
    })
  }

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }

  goBack() {
    this.location.back();
  }

}
