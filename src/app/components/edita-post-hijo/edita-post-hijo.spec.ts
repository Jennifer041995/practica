import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaPostHijo } from './edita-post-hijo';

describe('EditaPostHijo', () => {
  let component: EditaPostHijo;
  let fixture: ComponentFixture<EditaPostHijo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditaPostHijo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditaPostHijo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
