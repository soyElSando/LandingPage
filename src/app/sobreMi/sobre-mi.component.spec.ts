import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SobreMiComponent } from './sobre-mi.component';
import {RouterLink} from '@angular/router';

describe('SobreMiComponent', () => {
  let component: SobreMiComponent;
  let fixture: ComponentFixture<SobreMiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        RouterLink
      ],
      declarations: [ SobreMiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SobreMiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
