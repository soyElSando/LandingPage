import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiServerUrl = environment.apiBaseUrl + "/api/login";
  currentUserSubject: BehaviorSubject<any>
  

  constructor(/* private http: HttpClient */) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')|| '{}'))
   }

   //sin API
   iniciarSesion({email}:any):Observable<any>{
      sessionStorage.setItem('currentUser', JSON.stringify(email));  
      this.currentUserSubject.next(email)
      return this.currentUserSubject.asObservable();
    }
   //con API
   /* iniciarSesion(credenciales:any):Observable<any>{
    return this.http.post(this.apiServerUrl, credenciales).pipe(map(data => {
      sessionStorage.setItem('currentUser', JSON.stringify(data));  
      this.currentUserSubject.next(data); 
          
      return data;
    }))
   } */

   get UsuarioAutenticado() {
    return this.currentUserSubject.value;
   }

   cerrarSesion(){    
    sessionStorage.removeItem('currentUser')
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse('{}'));
   }

   isLoggedIn():Boolean {
      //sinAPI
      const usuarioLogueado = sessionStorage['currentUser'];
      //conAPI
      //const usuarioLogueado = Boolean(this.UsuarioAutenticado.accessToken);
      return usuarioLogueado
   }
}