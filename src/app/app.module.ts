import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Importa RouterModule

@Component({
  selector: 'app-root',
  standalone: true,  // Marca el componente como standalone
  imports: [RouterModule, HttpClientModule],   // Asegúrate de importar RouterModule aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mar_Paraiso';
}

