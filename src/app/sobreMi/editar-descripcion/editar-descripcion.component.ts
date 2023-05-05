import { Component, OnInit } from '@angular/core';
import { SobreMi } from '../../models/SobreMi.model';
import { SobreMiService } from '../sobre-mi.service';
import { LanguageService } from 'src/app/Shared/services/language.service';
import { Subscription } from 'rxjs';
import I18n from 'src/assets/I18n.json';

@Component({
  selector: 'app-editar-descripcion',
  templateUrl: './editar-descripcion.component.html',
  styleUrls: ['./editar-descripcion.component.css']
})
export class EditarDescripcionComponent implements OnInit {

  descripcionEs: string | undefined
  descripcionEn: string | undefined
  usuario: SobreMi | undefined
  titulo = I18n.seccion.sobreMi
  botones = I18n.boton
  ediciones = I18n.ediciones.sobreMi


  constructor(private usuarioService: SobreMiService, private languageService: LanguageService ) { }

  esEspanolSub: Subscription = new Subscription;
  idiomaEspanol:boolean =true
  
  ngOnInit(): void {
    this.usuarioService.getSobreMi().subscribe(data => {
      
      this.usuario=data;
      this.descripcionEs = this.usuario.descripcionEs;
      this.descripcionEn = this.usuario.descripcionEn;
     
  })

  this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
    this.idiomaEspanol = isAuthenticated
  })
  }

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }

  onEdit(){
    if(this.usuario){
    const usuarioEditado: SobreMi = this.usuario
    if(this.descripcionEs && this.descripcionEn){
      usuarioEditado.descripcionEs=this.descripcionEs
      usuarioEditado.descripcionEn=this.descripcionEn
      this.usuarioService.updateSobreMi(usuarioEditado).subscribe(() => {
      }, () => { alert(this.idiomaEspanol ? "Algo salió mal" : "Something went wrong") })
    }
  }
  }
}
