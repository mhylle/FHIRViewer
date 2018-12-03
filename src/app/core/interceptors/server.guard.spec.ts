import { TestBed, async, inject } from '@angular/core/testing';

import { ServerGuard } from './server.guard';

describe('ServerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerGuard]
    });
  });

  it('should ...', inject([ServerGuard], (guard: ServerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
