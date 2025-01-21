import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('authToken');
    if (token) {
      return true;  // Permitir el acceso si el token está presente
    } else {
      this.router.navigate(['/login']);  // Redirigir a login si no hay token
      return false;  // Bloquear el acceso
    }
  }
}