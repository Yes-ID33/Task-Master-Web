import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import ProjectController from "../Controllers/ProjectController.js";
import AlgorithmController from "../Controllers/AlgorithmController.js";

const router = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Rutas para páginas HTML
router.get('/', (req, res) => {
    res.sendFile(join(__dirname, '../View', 'Index.html'));
});
router.get('/Projects.html', (req, res) => {
    res.sendFile(join(__dirname, '../View', 'Projects.html'));
});
router.get('/Algorithms.html', (req, res) => {
    res.sendFile(join(__dirname, '../View', 'Algorithms.html'));
});

// Rutas para proyectos
router.get("/mis-proyectos", ProjectController.getProjects);
router.get("/proyecto/:IdProyecto", ProjectController.getProjectById);
router.post("/proyectos", ProjectController.addProject);
router.put("/update-proyecto/:IdProyecto", ProjectController.updateProject);
router.delete("/delete-proyecto", ProjectController.deleteProject);

// Rutas para algoritmos 🔥
router.get("/mis-algoritmos", AlgorithmController.getAlgorithms);
router.get("/algoritmo/:IdAlgoritmo", AlgorithmController.getAlgorithmById);
router.post("/algoritmos", AlgorithmController.addAlgorithm);
router.put("/update-algoritmo/:IdAlgoritmo", AlgorithmController.updateAlgorithm);
router.delete("/delete-algoritmo", AlgorithmController.deleteAlgorithm);

export default router;
