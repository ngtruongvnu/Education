import { TestBed } from '@angular/core/testing';

import { TutorDetailService } from './tutor-detail.service';

describe('TutorDetailService', () => {
  let service: TutorDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
