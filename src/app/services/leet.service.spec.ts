import { TestBed } from '@angular/core/testing';

import { LeetService } from './leet.service';

describe('LeetService', () => {
  let service: LeetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
