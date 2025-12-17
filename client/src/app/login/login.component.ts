import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

interface AuthResponse { access_token?: string; error?: string }

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  email = signal('');
  password = signal('');
  error = signal('');

  private returnUrl = '/';

  constructor() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  submit() {
    this.error.set('');
    this.auth.login(this.email(), this.password()).subscribe({
      next: (res: AuthResponse) => {
        if (res?.access_token) {
          this.auth.saveToken(res.access_token);
          this.router.navigateByUrl(this.returnUrl || '/');
        } else if (res?.error) {
          this.error.set(res.error);
        }
      },
      error: (err: HttpErrorResponse) => {
        const body = err.error as Record<string, unknown> | undefined;
        const msg = body && typeof body['error'] === 'string' ? (body['error'] as string) : 'Login failed';
        this.error.set(msg);
      }
    });
  }
}
