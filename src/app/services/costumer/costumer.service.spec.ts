import { TestBed, inject } from '@angular/core/testing';

import { CostumerService } from './costumer.service';

describe('CostumerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CostumerService]
    });
  });

  it('should be created', inject([CostumerService], (service: CostumerService) => {
    expect(service).toBeTruthy();
  }));
});
