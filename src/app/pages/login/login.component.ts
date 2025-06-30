import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  mensaje = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  iniciarSesion(): void {
    this.loginService.login(this.username, this.password).subscribe(
      (res) => {
        if (res.success) {
          this.mensaje = 'Inicio de sesión exitoso';
          localStorage.setItem('usuario', JSON.stringify(res.usuario));
          this.router.navigate(['/platos']);
        } else {
          this.mensaje = 'Credenciales inválidas';
        }
      },
      () => {
        this.mensaje = 'Error al conectar con el servidor';
      }
    );
  }
}
