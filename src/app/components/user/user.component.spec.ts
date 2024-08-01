import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

// Make sure you have installed @types/jest if you face issues with jest types
describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userServiceMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    // Mock setup for UserService
    userServiceMock = {
      getUser: jest.fn().mockReturnValue(of({
        id: 1,
        name: 'John Doe',
        socialMediaHandle: '@johndoe',
        profileImgSrc: 'https://example.com/profile.jpg',
        bio: 'Bio goes here',
        location: 'Location goes here',
        website: 'https://johndoe.com'
      }))
    };

    // Mock setup for ActivatedRoute
    activatedRouteMock = {
      params: of({ userId: '1' })
    };

    await TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      imports: [ CommonModule ],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user data on init', () => {
    // This ensures the getUser method was called correctly
    expect(userServiceMock.getUser).toHaveBeenCalledWith('1');

    // Check if the observable emits the expected data
    component.user$?.subscribe(user => {
      expect(user.name).toEqual('John Doe');
      expect(user.website).toEqual('https://johndoe.com');
    });
  });
});
