import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhePaciente } from './detalhe-paciente';

describe('DetalhePaciente', () => {
  let component: DetalhePaciente;
  let fixture: ComponentFixture<DetalhePaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhePaciente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhePaciente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
