import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GammeComponent } from './gamme.component';

describe('GammeComponent', () => {
  let component: GammeComponent;
  let fixture: ComponentFixture<GammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GammeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
