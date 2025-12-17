import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  private http = inject(HttpClient);

  profile = signal<unknown>(null);

  constructor() {
    this.http.get(`${environment.apiUrl}/profile`).subscribe({ next: (p) => this.profile.set(p), error: () => this.profile.set(null) });
  }
}
