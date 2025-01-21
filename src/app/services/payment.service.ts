import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8080/api/payments'; // URL del backend para pagos

  constructor(private http: HttpClient) {}

  // Realizar un pago
  processPayment(payment: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, payment);
  }
}
