import { Component } from '@angular/core';
import { Router } from '@angular/router';
import I18n from 'src/assets/I18n.json'

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  titulos = I18n.seccion
  idiomaEspanol = true

  constructor(private _router: Router) { 
  }

  toggleLanguage(){
    this.idiomaEspanol = !this.idiomaEspanol
  }

  scrollTo(element: any): void {
    this._router.navigate(['']).then(() => {
      (document.getElementById(element) as HTMLElement)
      .scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    });
  }
}
