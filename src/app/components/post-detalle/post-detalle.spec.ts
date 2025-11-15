import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetalle } from './post-detalle';

describe('PostDetalle', () => {
  let component: PostDetalle;
  let fixture: ComponentFixture<PostDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostDetalle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDetalle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
