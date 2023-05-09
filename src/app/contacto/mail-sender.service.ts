import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mail } from '../Shared/models/Mail.model';

@Injectable({
  providedIn: 'root'
})
export class MailSenderService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(/* private http: HttpClient */) { }
    //implementación MockBD
    
    public enviarMail(mail: Mail): Observable<any> {
      console.log(mail.body)
      return of('mail enviado!');
    }
    //implementación Back

    /*
  public enviarMail(mail: Mail): Observable<any>{
    return this.http.post<Mail>(this.apiServerUrl + '/Mail/enviar', mail);
  }
    */
}
