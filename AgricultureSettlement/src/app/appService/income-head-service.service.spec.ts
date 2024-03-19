import { TestBed } from '@angular/core/testing';

import { IncomeHeadServiceService } from './income-head-service.service';

describe('IncomeHeadServiceService', () => {
  let service: IncomeHeadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomeHeadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
