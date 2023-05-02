import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterarticleComponent } from './consulterarticle.component';

describe('ConsulterarticleComponent', () => {
  let component: ConsulterarticleComponent;
  let fixture: ComponentFixture<ConsulterarticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterarticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulterarticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
