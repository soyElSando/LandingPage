import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaSkillNuevaComponent } from './categoria-skill-nueva.component';

describe('CategoriaSkillNuevaComponent', () => {
  let component: CategoriaSkillNuevaComponent;
  let fixture: ComponentFixture<CategoriaSkillNuevaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaSkillNuevaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaSkillNuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
