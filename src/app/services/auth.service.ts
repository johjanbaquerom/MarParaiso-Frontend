import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',  // Asegura que el servicio esté disponible en toda la aplicación
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth'; // Cambia la URL a tu backend

  constructor(private http: HttpClient) {}

  // Login del usuario
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  // Registro del usuario
  register(user: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }
}

