import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
  { path: 'user/:userId', component: UserComponent },
  { path: '', redirectTo: '/user/1', pathMatch: 'full' }
];
