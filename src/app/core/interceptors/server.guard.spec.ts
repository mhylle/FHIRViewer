import {inject, TestBed} from '@angular/core/testing';

import {ServerGuard} from './server.guard';
import {RouterTestingModule} from '@angular/router/testing';
import {CookieService} from 'ngx-cookie-service';

describe('ServerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [ServerGuard, CookieService]
    });
  });

  it('should ...', inject([ServerGuard], (guard: ServerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
