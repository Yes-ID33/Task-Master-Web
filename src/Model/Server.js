import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import htmlRoutes from './Routes.js';

const app = express();
const port = 3511;

// Configurar middleware para procesar datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar middleware para servir archivos estáticos
const __dirname = dirname(fileURLToPath(import.meta.url));
const publicPath = join(__dirname, '..', 'Public');
app.use(express.static(publicPath));

// Usar el archivo de rutas para páginas HTML
app.use('/', htmlRoutes);

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});