import { TestBed } from '@angular/core/testing';

import { ExpenseReportServiceService } from './expense-report-service.service';

describe('ExpenseReportServiceService', () => {
  let service: ExpenseReportServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenseReportServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
