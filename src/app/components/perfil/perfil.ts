import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil implements OnInit {
  user: any = null;
  isLoginMode = true;
  notificationsEnabled = true;
  darkModeEnabled = false;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (user) {
        this.router.navigate(['/home']);
      }
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  async login(email: string, password: string) {
    try {
      await this.authService.login(email, password);
      this.alertService.success('Éxito', 'Inicio de sesión exitoso');
      this.router.navigate(['/home']);
    } catch (error) {
      this.alertService.error('Error', 'Credenciales incorrectas');
    }
  }

  async register(email: string, password: string) {
    try {
      await this.authService.register(email, password);
      this.alertService.success('Éxito', 'Registro exitoso');
      this.router.navigate(['/home']);
    } catch (error) {
      this.alertService.error('Error', 'Error en el registro');
    }
  }

  logout() {
    this.authService.logout();
    this.alertService.success('Éxito', 'Sesión cerrada');
    this.router.navigate(['/login']);
  }

  changePhoto() {
    // Implementar lógica para cambiar foto de perfil
    this.alertService.info('Información', 'Funcionalidad de cambio de foto próximamente disponible');
  }
}
