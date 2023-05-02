import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListearticleComponent } from './listearticle.component';

describe('ListearticleComponent', () => {
  let component: ListearticleComponent;
  let fixture: ComponentFixture<ListearticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListearticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListearticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
