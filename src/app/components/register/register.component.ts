import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegisterComponent {
  usernameError: string | undefined;
  generalError: string | undefined;

navigateToLogin() {

  this.router.navigate(['/login']);

}
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, 
              private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: this.passwordMatchValidator
    });
  }

  // Validador personalizado para confirmar que las contraseñas coincidan
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { 'mismatch': true };
  }

  // Función que se ejecuta cuando el formulario se envía
  onSubmit() {
      if (this.registerForm.invalid) {
        return;
      }
    
      const registerData = this.registerForm.value;
    
      this.authService.register(registerData).subscribe(
        (response) => {
          console.log('Registro exitoso:', response);
        },
        (error) => {
          console.error('Error en el registro:', error);
          alert(error.error);  // Muestra el error en la interfaz de usuario
        }
      );
    }

}

