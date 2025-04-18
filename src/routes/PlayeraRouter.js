const express = require("express");
const router = express.Router();
const upload = require("../Midlewares/multer.js");
const PlayeraController = require("../controllers/PlayeraController.js");

// Crear Playera con imágenes
router.post(
  "/",
  upload.fields([{ name: "imagenes", maxCount: 10 }]),
  PlayeraController.crearPlayera
);

// Obtener Playera por ID
router.get("/:id", PlayeraController.obtenerPlayeraById);

// Editar Playera con imágenes
router.put(
  "/editarPlayera/:id",
  upload.fields([{ name: "imagenes", maxCount: 10 }]),
  PlayeraController.editarPlayera
);

// Eliminar Playera por ID
router.delete("/:id", PlayeraController.eliminarPlayera);

// Obtener todos los Playeras
router.get("/", PlayeraController.obtenerPlayeras);

// Buscar Playera por texto
router.get("/buscar/:query", PlayeraController.buscarPlayeras);

// Búsqueda avanzada de Playeras (filtros, etc.)
router.post("/buscarAvanzados", PlayeraController.buscarPlayerasAvanzados);

module.exports = router;
