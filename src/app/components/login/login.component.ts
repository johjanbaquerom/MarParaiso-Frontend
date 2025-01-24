import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,  // Marca el componente como standalone
  imports: [CommonModule, ReactiveFormsModule],  // Asegúrate de que los módulos sean importados correctamente
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
usernameError: any;
generalError: any;

  navigateToRegister() {
    console.log('Botón de registro presionado');
    this.router.navigate(['/register']);  // Redirige a la página de registro
  }
  
  errorMessage: string | null = null;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, 
              private authService: AuthService, 
              private router: Router) {  // Inyecta el Router
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;  // Desestructuración para obtener los valores
  
      // Llama al servicio login pasando un objeto con username y password
      this.authService.login({ username, password }).subscribe({
        next: (response) => {
          console.log('Inicio de sesión exitoso', response);
          // Almacenar el token en localStorage
          localStorage.setItem('authToken', response.token);
          
          // Redirigir a la página de productos después de un login exitoso
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Error de inicio de sesión', err);
          this.errorMessage = 'Nombre de usuario o contraseña incorrectos';
        }
      });
    }
  }
}

