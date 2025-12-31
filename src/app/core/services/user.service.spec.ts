import { TestBed } from '@angular/core/testing';
import { UserService, User } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a default user', () => {
    const user = service.currentUser();
    expect(user).toBeTruthy();
    expect(user.name).toBe('Amy Elsner');
  });

  it('should update user', () => {
    const newUser: User = {
      name: 'John Doe',
      avatar: 'https://example.com/avatar.png',
    };
    service.updateUser(newUser);
    expect(service.currentUser()).toEqual(newUser);
  });
});
