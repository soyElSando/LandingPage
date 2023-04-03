import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/Shared/services/login.service';
import { LanguageService } from '../Shared/services/language.service';
import I18n from 'src/assets/I18n.json'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";
  registros: any;
  error: Boolean = false;
  noAutenticado: Boolean = false
  form!: FormGroup;
  texto = I18n.login
  idiomaEspanol:boolean =true
  esEspanolSub: Subscription = new Subscription;

  constructor( private formBuilder: FormBuilder, private loginService: LoginService, private rutas: Router,
    private languageService: LanguageService ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]], 
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
    return this.form.get('email')
  }

  get Password(){
    return this.form.get('password')
  }

  login(event: Event){
    event.preventDefault;
    this.loginService.iniciarSesion(this.form.value).subscribe(()=>{
      console.log("El usuarioAutenticado es", this.loginService.isLoggedIn());
      this.noAutenticado = false;      
      this.form.reset(); //si logueado        
      //this.rutas.navigate(['/']);
      window.location.reload();
    }, err => {
      this.noAutenticado = true;
      console.log("No se logueo: "+ err.message)  // si error
    })
  }

}
