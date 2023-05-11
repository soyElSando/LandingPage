import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Carrousel } from 'src/app/Shared/models/Carrousel.model';
import { LanguageService } from '../../services/language.service';
import I18n from 'src/assets/I18n.json'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-elemento-delete',
  templateUrl: './elemento-delete.component.html',
  styleUrls: ['./elemento-delete.component.css']
})
export class ElementoDeleteComponent {

  idiomaEspanol:boolean =true
  textos:any={es:"",en:""}
  botones = I18n.boton
  ediciones = I18n.carrousel.ediciones.borrar
  esEspanolSub: Subscription = new Subscription;
  elementosSub: Subscription = new Subscription;
  elemento?: Carrousel;
  itemABorrar: Carrousel =
  {
    id: 0,
    nombreEn: "Site under construction",
    nombreEs: "Sitio en construcción",
    imagen:"https://www.nasa.gov/sites/default/files/styles/full_width/public/thumbnails/image/web_first_images_release_0.png?itok=eP3obzhq",
    descripcionEs:"error 404",
    descripcionEn:"404 error",
    link:"",
  };

  @Input()  servicio: any
  @Input() itemID: number = 0;
  @Output() onDeleteEvent = new EventEmitter();

  constructor(private languageService: LanguageService) {
  }

  ngOnInit() {
    this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
      this.idiomaEspanol = isAuthenticated
    })
    this.textos= this.servicio.getName()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['itemID']) {
      this.renderizar()
    }
  }

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
    this.elementosSub.unsubscribe();
  }

  renderizar() {
    this.elementosSub = this.servicio.getElements().subscribe(
      
      (data:Carrousel[])=>{
        this.elemento=data
      .find((elemento: Carrousel) => elemento.id == this.itemID)
      if(this.elemento){
        this.itemABorrar=this.elemento
    }})
  }

  onDelete(): void {
    this.servicio.deleteElemento(this.itemID).subscribe(() => {
        this.onDeleteEvent.emit();
    }, () => { alert(this.idiomaEspanol ? "Algo salió mal" : "Something went wrong") })

  }
}