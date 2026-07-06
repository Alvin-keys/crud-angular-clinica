import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './landing.html',
  styleUrl: './landing.scss'
})
export class LandingComponent {

  private router = inject(Router);

  anoAtual = new Date().getFullYear();

  entrar() {
    this.router.navigate(['/login']);
  }
}