import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';// Importa el componente standalone

@NgModule({
  imports: [
    ServerModule, // Necesario para SSR
  ]
})
export class AppServerModule {}