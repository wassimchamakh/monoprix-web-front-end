import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrixComponent } from './prix.component';

describe('PrixComponent', () => {
  let component: PrixComponent;
  let fixture: ComponentFixture<PrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
