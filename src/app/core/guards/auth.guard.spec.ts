import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { signal } from '@angular/core';

describe('authGuard', () => {
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    authServiceMock = {
      isAuthenticated: signal(false)
    };
    routerMock = {
      createUrlTree: vi.fn().mockReturnValue('redirect-url')
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });
  });

  it('should return true if authenticated', () => {
    authServiceMock.isAuthenticated.set(true);
    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
    expect(result).toBe(true);
  });

  it('should return UrlTree if unauthenticated', () => {
    authServiceMock.isAuthenticated.set(false);
    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
    expect(result).toBe('redirect-url');
    expect(routerMock.createUrlTree).toHaveBeenCalledWith(['/']);
  });
});
