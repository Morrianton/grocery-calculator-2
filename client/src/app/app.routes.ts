import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { RedirectComponent } from './redirect/redirect.component';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', component: RedirectComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
];
