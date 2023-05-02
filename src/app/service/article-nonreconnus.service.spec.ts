import { TestBed } from '@angular/core/testing';

import { ArticleNonreconnusService } from './article-nonreconnus.service';

describe('ArticleNonreconnusService', () => {
  let service: ArticleNonreconnusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleNonreconnusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
