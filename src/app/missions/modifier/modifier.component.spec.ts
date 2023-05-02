import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierComponent } from './modifier.component';

describe('ModifierComponent', () => {
  let component: ModifierComponent;
  let fixture: ComponentFixture<ModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
