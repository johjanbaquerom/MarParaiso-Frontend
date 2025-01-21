import 'zone.js'; // Asegúrate de que Zone.js está importado
import { renderModule } from '@angular/platform-server'; // Asegúrate de tener este archivo creado
import { readFileSync } from 'fs';
import { join } from 'path';
import express from 'express';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environments';
import { AppServerModule } from './app/app.server/module';

if (environment.production) {
  enableProdMode();
}

const app = express();

// Ruta al archivo index.server.html
const indexHtml = readFileSync(join(__dirname, 'index.server.html'), 'utf-8');

// Manejo de todas las solicitudes
app.get('*', (req, res) => {
  renderModule(AppServerModule, {
    document: indexHtml,
    url: req.url,
  })
    .then((html: string) => {
      res.send(html); // Envía el HTML renderizado
    })
    .catch((err: any) => {
      res.status(500).send(err); // Maneja errores
    });
});

// Puerto por defecto o el puerto definido en la variable de entorno
const port = process.env['PORT'] || 4000;
app.listen(port, () => {
  console.log(`Node server listening on http://localhost:${port}`);
});

