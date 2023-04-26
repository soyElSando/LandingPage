import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Experiencia } from 'src/app/experiencia/Experiencia.model';
import { ExperienciaService } from 'src/app/experiencia/experiencia.service';

@Component({
  selector: 'app-borrar-experiencia',
  templateUrl: './borrar-experiencia.component.html',
  styleUrls: ['./borrar-experiencia.component.css']
})

export class BorrarExperienciaComponent implements OnInit {

  @Input() experienciaABorrar?: Experiencia
  constructor(private experienciaService: ExperienciaService) { }

  @Output() onDeleteEvent = new EventEmitter();
  
  ngOnInit(): void {
  }

  onDelete():void{
    
    if(this.experienciaABorrar?.idExp!== undefined){
    this.experienciaService.deleteExperiencia(this.experienciaABorrar.idExp).subscribe(data => {      
      this.onDeleteEvent.emit();
    }, err =>{alert("Algo salió mal")} )
    }
  }
}

