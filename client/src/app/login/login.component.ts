import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = signal('');
  password = signal('');
  error = signal('');

  private returnUrl = '/';

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  submit() {
    this.error.set('');
    this.auth.login(this.email(), this.password()).subscribe({
      next: (res: any) => {
        if (res?.access_token) {
          this.auth.saveToken(res.access_token);
          this.router.navigateByUrl(this.returnUrl || '/');
        } else if (res?.error) {
          this.error.set(res.error);
        }
      },
      error: (err) => this.error.set(err?.error || 'Login failed')
    });
  }
}
