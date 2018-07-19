import { TestBed, inject } from '@angular/core/testing';

import { RegionalService } from './regional.service';

describe('RegionalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegionalService]
    });
  });

  it('should be created', inject([RegionalService], (service: RegionalService) => {
    expect(service).toBeTruthy();
  }));
});
