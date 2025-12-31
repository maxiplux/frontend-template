import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be unauthenticated by default', () => {
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should authenticate after login', () => {
    service.login();
    expect(service.isAuthenticated()).toBe(true);
  });

  it('should unauthenticate after logout', () => {
    service.login();
    service.logout();
    expect(service.isAuthenticated()).toBe(false);
  });
});
