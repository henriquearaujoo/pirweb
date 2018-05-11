import { TestBed, inject } from '@angular/core/testing';

import { BigraphService } from './bigraph.service';

describe('BigraphService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BigraphService]
    });
  });

  it('should be created', inject([BigraphService], (service: BigraphService) => {
    expect(service).toBeTruthy();
  }));
});
