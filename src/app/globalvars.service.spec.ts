import { TestBed } from '@angular/core/testing';

import { GlobalvarsService } from './globalvars.service';

describe('GlobalvarsService', () => {
  let service: GlobalvarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalvarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
