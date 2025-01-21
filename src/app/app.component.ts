import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Importa RouterModule

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule]  // Asegúrate de importar RouterModule
})
export class AppComponent {
  title = 'mar-paraiso-frontend';
}



