import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseigneComponent } from './enseigne.component';

describe('EnseigneComponent', () => {
  let component: EnseigneComponent;
  let fixture: ComponentFixture<EnseigneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnseigneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnseigneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
