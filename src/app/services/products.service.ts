import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products'; // URL del backend para productos

  constructor(private http: HttpClient) {}

  getAllProducts(searchTerm: string = '', selectedCategory: string = ''): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No token found in localStorage');
      return throwError(() => new Error('No token found'));
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params: any = {};
    if (searchTerm) params.search = searchTerm;
    if (selectedCategory) params.category = selectedCategory;
  
    return this.http.get<any[]>(this.apiUrl, { headers, params }).pipe(
      catchError((error) => {
        console.error('Error fetching products:', error);
        return throwError(() => error);
      })
    );
  }

  // Obtener un producto por su ID
  getProductById(id: number): Observable<any> {
    const token = localStorage.getItem('authToken');  // Obtener el token almacenado
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);  // Agregar el token en las cabeceras
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }

  uploadProductImage(productId: number, formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    // Aquí puedes agregar más encabezados si es necesario, por ejemplo, Authorization
    return this.http.post<any>(`${this.apiUrl}/${productId}/upload-image`, formData, { headers });
  }
}

