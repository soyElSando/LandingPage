import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';
import I18n from 'src/assets/I18n.json'
import { Subscription } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  titulos = I18n.seccion
  idiomaEspanol:boolean =true
  esEspanolSub: Subscription = new Subscription;

  constructor(private _router: Router, private languageService: LanguageService) { 
  }

  ngOnInit() {
    this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
      this.idiomaEspanol = isAuthenticated
    })
  }

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }

  toggleLanguage(){
    this.languageService.toogleLanguage();
  }

  scrollTo(element: any): void {
    this._router.navigate(['']).then(() => {
      (document.getElementById(element) as HTMLElement)
      .scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    });
  }
}
