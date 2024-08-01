import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  user$?: Observable<User>;

  public themeService = inject(ThemeService);
  public userService = inject(UserService);
  public route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.user$ = this.route.params.pipe(
      switchMap(params => {
        const userId = params['userId'];
        return this.userService.getUser(userId);
      })
    );
  }

}
