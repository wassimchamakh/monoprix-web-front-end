import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleNonrecconusComponent } from './article-nonrecconus.component';

describe('ArticleNonrecconusComponent', () => {
  let component: ArticleNonrecconusComponent;
  let fixture: ComponentFixture<ArticleNonrecconusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleNonrecconusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleNonrecconusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
