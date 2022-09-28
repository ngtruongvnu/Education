import { TestBed } from '@angular/core/testing';

import { ServicePackageService } from './service-package.service';

describe('ServicePackageService', () => {
  let service: ServicePackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicePackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
