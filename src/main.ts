import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { AuthService } from './app/services/auth.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './app/components/login/login.component';
import { ProductListComponent } from './app/product-list/product-list.component';
import { AuthGuard } from './app/auth.guard';
import { RegisterComponent } from './app/components/register/register.component';
import { AuthInterceptor } from './app/auth.interceptor';

// Definir las rutas
export const routes: Routes = [
  { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

// Bootstrap de la aplicación
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Proporciona el cliente HTTP
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, 
      multi: true // Permite múltiples interceptores
    },
    provideRouter(routes),  // Proporciona las rutas
    AuthService,
    AuthGuard,  // Si usas el AuthGuard
    CommonModule
  ]
}).catch(err => console.error(err));
