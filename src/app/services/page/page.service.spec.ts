import { TestBed, inject } from '@angular/core/testing';

import { AccessPageService } from './access-page.service';

describe('PageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccessPageService]
    });
  });

  it('should be created', inject([AccessPageService], (service: AccessPageService) => {
    expect(service).toBeTruthy();
  }));
});
