import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders'; // URL del backend para órdenes

  constructor(private http: HttpClient) {}

  // Obtener todas las órdenes
  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Crear una nueva orden
  createOrder(order: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, order);
  }
}
