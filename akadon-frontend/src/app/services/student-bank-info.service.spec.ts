import { TestBed } from '@angular/core/testing';

import { StudentBankInfoService } from './student-bank-info.service';

describe('StudentBankInfoService', () => {
  let service: StudentBankInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentBankInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
