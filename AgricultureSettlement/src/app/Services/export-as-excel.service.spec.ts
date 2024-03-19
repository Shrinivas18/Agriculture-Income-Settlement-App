import { TestBed } from '@angular/core/testing';

import { ExportAsExcelService } from './export-as-excel.service';

describe('ExportAsExcelService', () => {
  let service: ExportAsExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportAsExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
