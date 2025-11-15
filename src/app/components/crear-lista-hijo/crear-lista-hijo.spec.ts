import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearListaHijo } from './crear-lista-hijo';

describe('CrearListaHijo', () => {
  let component: CrearListaHijo;
  let fixture: ComponentFixture<CrearListaHijo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearListaHijo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearListaHijo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
