import { TestBed } from '@angular/core/testing';

import { EstatesService } from './estates-service.service';

describe('EstatesServiceService', () => {
  let service: EstatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
