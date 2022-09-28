import { TestBed } from '@angular/core/testing';

import { TutorRequestService } from './tutor-request.service';

describe('TutorRequestService', () => {
  let service: TutorRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
