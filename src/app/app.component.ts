import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Importa RouterModule
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, HttpClientModule, ProductListComponent]  // Asegúrate de importar RouterModule
})
export class AppComponent {
  title = 'mar-paraiso-frontend';
}



