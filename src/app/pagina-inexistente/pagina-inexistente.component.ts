import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import I18n from 'src/assets/I18n.json'
import { LanguageService } from '../Shared/services/language.service';

@Component({
  selector: 'app-pagina-inexistente',
  templateUrl: './pagina-inexistente.component.html',
  styleUrls: ['./pagina-inexistente.component.css']
})
export class PaginaInexistenteComponent implements OnInit {

  mensaje = I18n._404
  idiomaEspanol:boolean =true
  esEspanolSub: Subscription = new Subscription;

  constructor(private languageService: LanguageService) { }

  ngOnInit(): void {
    this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
      this.idiomaEspanol = isAuthenticated
    })
  }
  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }

}
