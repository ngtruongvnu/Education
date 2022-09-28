import { TestBed } from '@angular/core/testing';

import { TutorScheduleServiceService } from './tutor-schedule-service.service';

describe('TutorScheduleServiceService', () => {
  let service: TutorScheduleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorScheduleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
