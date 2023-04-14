import { TestBed } from '@angular/core/testing';

import { EnseigneService } from './enseigne.service';

describe('EnseigneService', () => {
  let service: EnseigneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnseigneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
