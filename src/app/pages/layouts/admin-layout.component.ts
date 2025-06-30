import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
  mostrarMenu = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }

  cerrarSesion() {
    localStorage.clear(); // O lógica de logout con Auth
    this.router.navigate(['/login']);
  }
}
