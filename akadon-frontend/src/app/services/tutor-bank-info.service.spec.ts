import { TestBed } from '@angular/core/testing';

import { TutorBankInfoService } from './tutor-bank-info.service';

describe('TutorBankInfoService', () => {
  let service: TutorBankInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorBankInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
