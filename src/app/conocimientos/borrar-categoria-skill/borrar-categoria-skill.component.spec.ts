import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarCategoriaSkillComponent } from './borrar-categoria-skill.component';

describe('BorrarCategoriaSkillComponent', () => {
  let component: BorrarCategoriaSkillComponent;
  let fixture: ComponentFixture<BorrarCategoriaSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrarCategoriaSkillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrarCategoriaSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
