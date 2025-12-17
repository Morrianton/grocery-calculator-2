import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);


  ngOnInit(): void {
    const token = this.auth.getToken();
    const target = token && this.auth.isTokenValid(token) ? '/profile' : '/login';
    // use navigateByUrl to preserve full redirect
    this.router.navigateByUrl(target);
  }
}
