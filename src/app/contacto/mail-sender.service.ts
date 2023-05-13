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
  private useMock = environment.mockDB;

  constructor( private http: HttpClient ) { }
    
    
    public enviarMail(mail: Mail): Observable<any> {
      if (this.useMock) {
        console.log(mail.body)
        return of('mail enviado!');
      }else{
        return this.http.post<Mail>(this.apiServerUrl + '/Mail/enviar', mail);
      }
    }
    
}
