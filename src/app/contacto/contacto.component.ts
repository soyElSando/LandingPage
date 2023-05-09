import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mail } from 'src/app/Shared/models/Mail.model';
import { SobreMi } from 'src/app/sobreMi/SobreMi.model';
import { MailSenderService } from './mail-sender.service';
import { SobreMiService } from 'src/app/sobreMi/sobre-mi.service';
import I18n from 'src/assets/I18n.json'
import { Subscription } from 'rxjs';
import { LanguageService } from '../Shared/services/language.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  public usuario: SobreMi | undefined;
  texto = I18n.contacto
  idiomaEspanol:boolean =true
  esEspanolSub: Subscription = new Subscription;
  email!: string;
  nombre!: string;
  body!: string;
  myModal = document.getElementById('confirmacionEnvio');
  mostrarConfirmacion: Boolean = false;
  mostrarError: Boolean = false;

  mailForm!: FormGroup;
  

  constructor(
    private sobreMiService: SobreMiService,
    private formBuilder: FormBuilder,
    private mailSender: MailSenderService,
    private router: Router,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {

    this.renderizar()

    this.sobreMiService.getOnEditEvent().subscribe(() => {
      this.renderizar();
    });

    this.mailForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        nombre: ['', [Validators.required, Validators.minLength(2)]],
        body: ['', [Validators.required]]

      }
    ) 

    this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
      this.idiomaEspanol = isAuthenticated
    })
  }

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }

  get Email(){
    return this.mailForm.get('email')
  }

  get Nombre(){
    return this.mailForm.get('nombre')
  }

  get Body(){
    return this.mailForm.get('body')
  }
  

  renderizar(){
    this.sobreMiService.getSobreMi().subscribe(data => {
      
    this.usuario = data;

  } ); }

  enviar(event: Event){
    event.preventDefault;
    const { nombre, email, body} = this;
    const correo: Mail = { nombre: nombre, fromEmail: email, body: body};
    //implementación MockBD
    this.mailSender.enviarMail(correo).subscribe(() => {
      console.log("El mail enviado es", correo);
      this.mostrarConfirmacion = true;
      
      setTimeout(() => {
        this.mostrarConfirmacion = false;
      }, 8000);
      
      this.mailForm.reset();
    }, () => {
      this.mostrarError = true;
      
      setTimeout(() => {
        this.mostrarError = false;
      }, 8000);
    });
    //implementación Back
    /* this.mailSender.enviarMail(correo).subscribe(()=>{
      console.log("El mail enviado es", correo);
      this.mostrarConfirmacion = true;    
      
      setTimeout(()=>{
        this.mostrarConfirmacion = false;
      }, 8000
      )
     this.mailForm.reset();
    }, err => {
      this.mostrarError = true;    
      
      setTimeout(()=>{
        this.mostrarError = false;
      }, 8000
      )
    }) */  
  }
}
