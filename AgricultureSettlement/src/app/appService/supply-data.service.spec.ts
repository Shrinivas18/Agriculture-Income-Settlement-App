import { TestBed } from '@angular/core/testing';

import { SupplyDataService } from './supply-data.service';

describe('SupplyDataService', () => {
  let service: SupplyDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
