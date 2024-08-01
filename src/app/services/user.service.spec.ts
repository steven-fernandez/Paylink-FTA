import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model'; // Ensure this path is correct

describe('UserService', () => {
  let service: UserService;
  let httpController: HttpTestingController;
  const baseUrl = 'http://localhost:3000/user';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify(); // Verify that no unmatched requests are outstanding.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a user by ID', () => {
    const mockUser: User = {
      id: 1,
      name: 'John Doe',
      socialMediaHandle: '@johndoe',
      profileImgSrc: 'https://example.com/profile.jpg',
      bio: 'Bio here',
      location: 'Some location',
      website: 'https://johndoe.com'
    };

    service.getUser(1).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpController.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockUser); // Simulate a response with the mockUser data
  });
});
