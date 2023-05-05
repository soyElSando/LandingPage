import { Component, Input } from '@angular/core';
import { Carrousel } from 'src/app/models/Carrousel.model';
import { LanguageService } from '../services/language.service';
import I18n from 'src/assets/I18n.json'
import { Subscription } from 'rxjs';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent {

  idiomaEspanol:boolean =true
  link = I18n.boton.link
  botones = I18n.boton
  ediciones = I18n.carrousel.ediciones
  idABorrar: number = 1;
  idAEditar: number = 2;
  itemABorrar?: Carrousel;
  esEspanolSub: Subscription = new Subscription;
  elementosSub: Subscription = new Subscription;
  elementos: Carrousel[] =
  [{
    id: 0,
    nombreEn: "Site under construction",
    nombreEs: "Sitio en construcción",
    imagen:"https://www.nasa.gov/sites/default/files/styles/full_width/public/thumbnails/image/web_first_images_release_0.png?itok=eP3obzhq",
    descripcionEs:"error 404",
    descripcionEn:"404 error",
    link:"",
  }];

  @Input()  servicio: any
  @Input()  carrouselId!: string ;

  constructor(private languageService: LanguageService, private _loginService: LoginService) {
  }

  ngOnInit() {
    this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
      this.idiomaEspanol = isAuthenticated
    })
    this.renderizar()
  }

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
    this.elementosSub.unsubscribe();
  }

  estaLogueado = () => {
    return this._loginService.isLoggedIn();
  }

  renderizar() {
    this.elementosSub = this.servicio.getElements().subscribe((data:Carrousel[])=>this.elementos=data)
  }

  /* onDelete(): void {
    this.servicio.delete(this.idABorrar).subscribe(() => {
      this.renderizar()
    }, () => { alert(this.idiomaEspanol ? "Algo salió mal" : "Something went wrong") })

  }


  buscarPorId(id: number) {
    this.itemABorrar = this.elementos.find(elemento => elemento.id == id);
    return this.idiomaEspanol ? this.itemABorrar?.nombreEs : this.itemABorrar?.nombreEn;
  } */
}