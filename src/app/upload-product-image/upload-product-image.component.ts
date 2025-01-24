import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/products.service';

@Component({
  selector: 'app-upload-product-image',
  templateUrl: './upload-product-image.component.html',
  styleUrls: ['./upload-product-image.component.css']
})
export class UploadProductImageComponent {
  selectedFile: File | null = null;
  productId!: number;
  imageUrl: string = '';

  constructor(private productService: ProductService) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(productId: number) {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
  
      this.productService.uploadProductImage(productId, formData).subscribe({
        next: (response: any) => {
          console.log('Imagen cargada correctamente', response);
        },
        error: (error) => {
          console.error('Error al cargar la imagen', error);
        }
      });
    }
  }
}

