import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/products.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true, // Marca este componente como standalone
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  searchTerm: string = ''; // Campo para el término de búsqueda
  selectedCategory: string = ''; // Campo para la categoría seleccionada

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts(this.searchTerm, this.selectedCategory).subscribe({
      next: (data) => {
        console.log('Datos recibidos del servidor:', data);  // Verifica qué datos estás recibiendo
        this.products = data.map((product: any) => {
          console.log('URL de la imagen original:', product.imageUrl);  // Verifica si hay un valor para imageUrl
          
          if (product.imageUrl && !product.imageUrl.startsWith('http')) {
            product.imageUrl = 'http://localhost:8080' + product.imageUrl;
          } else if (!product.imageUrl) {
            product.imageUrl = 'http://localhost:8080/images/poker.jpg';
          }
  
          console.log('URL final de la imagen:', product.imageUrl);  // Verifica que la URL final esté correcta
          return product;
        });
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  // Método para manejar la carga de imágenes
  onImageLoad(product: any): void {
    console.log(`Imagen cargada correctamente para el producto: ${product.name}`);
  }

  // Método para manejar errores en la carga de imágenes
  onImageError(product: any): void {
    console.log('Error al cargar la imagen para el producto:', product.name);
    product.imageUrl = 'http://localhost:8080/images/default.jpg'; // Usa una imagen por defecto
  }

  onSearchChange(): void {
    this.loadProducts();
  }

  onCategoryChange(): void {
    this.loadProducts();
  }
}

