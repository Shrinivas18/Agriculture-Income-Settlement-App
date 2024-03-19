import { TestBed } from '@angular/core/testing';

import { ExpenseHeadServiceService } from './expense-head-service.service';

describe('ExpenseHeadServiceService', () => {
  let service: ExpenseHeadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenseHeadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
