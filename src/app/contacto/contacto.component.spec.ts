import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { ContactoComponent } from './contacto.component';
import { MailSenderService } from './mail-sender.service';
import { SobreMiService } from 'src/app/sobreMi/sobre-mi.service';
import { SobreMi } from 'src/app/sobreMi/SobreMi.model';
import { Mail } from 'src/app/Shared/models/Mail.model';

describe('ContactoComponent', () => {
  let component: ContactoComponent;
  let fixture: ComponentFixture<ContactoComponent>;
  let sobreMiService: SobreMiService;
  let mailSenderService: MailSenderService;
  let sobreMiServiceMock: SobreMi={
    "nombre": "Germán Sandoval",
    "email": "argentina@programa.com",
    "password": "1234",
    "profesion": "Desarrolladora Full Stack Jr.",
    "linkIn": "https://www.linkedin.com/in/leticia-portillo-b62ba3103/",
    "linkMail":"/contacto",
    "linkWP":"",
    "linkGH": "https://github.com/soyElSando",
    "linkIG":"https://instagram.com/ger.sando",
    "descripcionEs": "La <strong>diversidad</strong> en la formación, en el trabajo y en los intereses es algo pasado de moda. Hoy no está bien visto porque se tiende a pensar que se es 'poco especialista'. Sin embargo, es algo de mi persona que valoro mucho. Admito ante la mirada del lector que mi formación es diversa en distintas áreas. Cuando digo áreas diversas digo artes, electrónica, redes, administración y digo desarrollo de software (por supuesto).",
    "descripcionEn": "lorem ipsum dolor sit amet, consectetur adip",
    "avatar": "assets/gerSando.jpg"
}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [ContactoComponent],
      providers: [
        {
          provide: SobreMiService,
          useValue: { sobreMiServiceMock },
        },
        {
          provide: MailSenderService,
          useValue: { enviarMail: () => of({}) },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactoComponent);
    component = fixture.componentInstance;
    sobreMiService = TestBed.inject(SobreMiService);
    mailSenderService = TestBed.inject(MailSenderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set usuario property with value from sobreMiService', () => {
    const sobreMi = sobreMiServiceMock;
    spyOn(sobreMiService, 'getSobreMi').and.returnValue(of(sobreMi));
    component.ngOnInit();
    expect(component.usuario).toEqual(sobreMi);
  });

  it('should set mostrarConfirmacion to true after sending email warningfully', fakeAsync(() => {
    const mail: Mail = {
      nombre: 'test',
      fromEmail: 'test@test.com',
      body: 'test message',
    };
    spyOn(mailSenderService, 'enviarMail').and.returnValue(of({}));
    component.nombre = mail.nombre;
    component.email = mail.fromEmail;
    component.body = mail.body;
    component.enviar(new Event('click'));
    tick(5000);
    fixture.detectChanges();
    const confirmacion = fixture.debugElement.nativeElement.querySelector('#confirmacion');
    expect(confirmacion).toBeTruthy();
  }));

  it('should set mostrarError to true after failing to send email', () => {
    const mail: Mail = {
      nombre: 'test',
      fromEmail: 'test@test.com',
      body: 'test message',
    };
    spyOn(mailSenderService, 'enviarMail').and.returnValue(
      throwError('Error sending email')
    );
    component.nombre = mail.nombre;
    component.email = mail.fromEmail;
    component.body = mail.body;
    component.enviar(new Event('click'));
    expect(component.mostrarError).toBeTruthy();
  });
});

