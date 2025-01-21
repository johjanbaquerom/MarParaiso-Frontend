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
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      const user = { username, email, password };

      // Llamada al servicio de registro
      this.authService.register(user).subscribe({
        next: (response: any) => {
          console.log('Registro exitoso', response);
          // Aquí puedes redirigir a la página de login o a cualquier otra
        },
        error: (err: any) => {
          console.error('Error en el registro', err);
        }
      });
    } else {
      console.error('El formulario no es válido');
    }
  }

}

