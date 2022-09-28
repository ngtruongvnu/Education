import { TestBed } from '@angular/core/testing';

import { VerifycateImageService } from './verifycate-image.service';

describe('VerifycateImageService', () => {
  let service: VerifycateImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifycateImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
