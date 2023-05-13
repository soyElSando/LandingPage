/* import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private loginService: LoginService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var currentUser= this.loginService.UsuarioAutenticado
    console.log(currentUser)
    if(currentUser && currentUser.accessToken){
      console.log(currentUser.accessToken)
      req = req.clone({
        setHeaders:{
          Authorization: `Bearer ${currentUser.accessToken}`
        }
      })
    }
    return next.handle(req);
  }
}
 */

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoginService } from './login.service';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private loginService: LoginService, private spinnerService: SpinnerService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.showSpinner();
    var currentUser= this.loginService.UsuarioAutenticado
    if(currentUser && currentUser.accessToken){
      req = req.clone({
        setHeaders:{
          Authorization: `Bearer ${currentUser.accessToken}`
        }
      })
    }
    return next.handle(req).pipe(
      finalize(() => this.spinnerService.hideSpinner())
    );
  }
}