import { TestBed } from '@angular/core/testing';

import { IncomeReportServiceService } from './income-report-service.service';

describe('IncomeReportServiceService', () => {
  let service: IncomeReportServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomeReportServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
