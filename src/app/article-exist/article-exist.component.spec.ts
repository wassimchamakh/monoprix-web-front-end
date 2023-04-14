import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleExistComponent } from './article-exist.component';

describe('ArticleExistComponent', () => {
  let component: ArticleExistComponent;
  let fixture: ComponentFixture<ArticleExistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleExistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleExistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
