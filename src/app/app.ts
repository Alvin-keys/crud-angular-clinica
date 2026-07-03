import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('crud-angular-material');

  private router = inject(Router);
  private urlAtual = signal(this.router.url);

  constructor() {
    this.router.events
      .pipe(filter(evento => evento instanceof NavigationEnd))
      .subscribe(evento => {
        this.urlAtual.set((evento as NavigationEnd).urlAfterRedirects);
      });
  }

  mostrarToolbar() {
    return this.urlAtual() !== '/';
  }
}