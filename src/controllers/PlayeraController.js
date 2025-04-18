// const pool =  require("../config/db");
const cloudinary = require("cloudinary").v2;
const Playera = require("../models/playeraModel"); // Asegúrate que la ruta sea correcta

// Configuración de Cloudinary
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: "dvvhnrvav",
    api_key: "982632489651298",
    api_secret: "TTIZcgIMiC8F4t8cE-t6XkQnPyQ",
});

const PlayeraController = {
    // Crear un nuevo Playera
    crearPlayera: async (req, res) => {
        try {
            const {
                nombre,
                descripcion,
                color,
                nuevo,
                oferta,
                forma_cuello,
                precio_anterior,
                precio_actual,
                mostrar_precio_anterior,
                talla_seleccionada,
                stock
            } = req.body;

            // console.log("BODY:", req.body);
            // console.log("FILES:", req.body.imagenes);
            // console.log("Tipo de req.files.imagenes:", typeof req.files?.imagenes);
            // console.log("Es array?:", Array.isArray(req.files?.imagenes));

            // Subir imágenes a Cloudinary
            const imagenesSubidas = [];

            if (req.body.imagenes) {
                // console.log("Procesando imágenes desde body");

                // Convertir a array si no lo es
                const imagenes = Array.isArray(req.body.imagenes)
                    ? req.body.imagenes
                    : [req.body.imagenes];

                // console.log("Imágenes a procesar (normalizadas):", imagenes);

                for (const img of imagenes) {
                    try {
                        // console.log("Procesando imagen:", {
                        //     tipo: typeof img,
                        //     contenido: img.length > 50 ? img.substring(0, 50) + "..." : img
                        // });

                        let resultado;

                        // Si es una URL http(s)
                        if (img.startsWith('http')) {
                            // console.log("Subiendo URL a Cloudinary");
                            resultado = await cloudinary.uploader.upload(img, {
                                folder: "ProductosVentaPlayeras"
                            });
                        }
                        // Si es base64
                        else if (img.startsWith('data:image')) {
                            // console.log("Subiendo base64 a Cloudinary");
                            resultado = await cloudinary.uploader.upload(img, {
                                folder: "ProductosVentaPlayeras"
                            });
                        }
                        // Si es una ruta local (por si acaso)
                        else if (fs.existsSync(img)) {
                            console.log("Subiendo archivo local a Cloudinary");
                            resultado = await cloudinary.uploader.upload(img, {
                                folder: "ProductosVentaPlayeras"
                            });
                        }
                        else {
                            throw new Error("Formato de imagen no válido");
                        }

                        imagenesSubidas.push(resultado.secure_url);
                        // console.log("Imagen subida a Cloudinary:", resultado.secure_url);

                    } catch (error) {
                        console.error("Error al procesar imagen:", {
                            error: error.message,
                            imagen: img.length > 50 ? img.substring(0, 50) + "..." : img
                        });
                    }
                }
            } else {
                console.warn("No se recibieron imágenes en req.body.imagenes");
            }
            // Validar datos antes de crear
            const datosPlayera = {
                nombre,
                descripcion,
                color,
                nuevo: nuevo === 'true',
                oferta: oferta === 'true',
                forma_cuello,
                precio_anterior: parseFloat(precio_anterior),
                precio_actual: parseFloat(precio_actual),
                mostrar_precio_anterior: mostrar_precio_anterior === 'true',
                imagenes: imagenesSubidas,
                talla_seleccionada,
                stock : parseInt(stock) || 0 // Asegúrate de que el stock sea un número
            };

            console.log("Datos finales para crear playera:", datosPlayera);

            // Crear la nueva playera en la base de datos
            const nuevaPlayera = await Playera.create(datosPlayera);

            res.status(201).json({
                success: true,
                data: nuevaPlayera
            });
        } catch (err) {
            console.error("Error completo al crear playera:", {
                message: err.message,
                stack: err.stack,
                body: req.body,
                files: req.files
            });

            res.status(500).json({
                success: false,
                error: "Error al crear el producto",
                details: process.env.NODE_ENV === 'development' ? err.message : undefined
            });
        }
    },


    // Obtener todos los Playeras
    obtenerPlayeras: async (req, res) => {
        try {
            const playeras = await Playera.findAll({
                order: [['id', 'DESC']],
            });

            res.status(200).json({
                success: true,
                data: playeras,
            });
        } catch (err) {
            console.error('Error al obtener playeras:', err);
            res.status(500).json({
                success: false,
                error: 'Error al obtener playeras',
            });
        }
    },

   // Obtener Playera por ID usando Sequelize
 obtenerPlayeraById: async (req, res) => {
    try {
      const { id } = req.params;
  
      const playera = await Playera.findByPk(id); // Busca por primary key
  
      if (!playera) {
        return res.status(404).json({ error: "Playera no encontrada" });
      }
  
      res.status(200).json(playera);
    } catch (err) {
      console.error("Error al obtener playera:", err);
      res.status(500).json({ error: "Error al obtener la playera" });
    }
  },

  
    // Editar Playera
    editarPlayera: async (req, res) => {
      try {
        const { id } = req.params;
        const { nombre, descripcion, precio } = req.body;
  
        let nuevasImagenes = [];
  
        if (req.files?.imagenes) {
          for (const file of req.files.imagenes) {
            const result = await cloudinary.uploader.upload(file.path, {
              folder: 'Playeras',
            });
            nuevasImagenes.push(result.secure_url);
          }
        }
  
        const [updated] = await Playera.update(
          {
            nombre,
            descripcion,
            precio,
            imagenes: nuevasImagenes.length > 0 ? nuevasImagenes : undefined
          },
          { where: { id }, returning: true }
        );
  
        if (!updated) {
          return res.status(404).json({ error: 'Playera no encontrada' });
        }
  
        const updatedPlayera = await Playera.findByPk(id);
        res.json(updatedPlayera);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al editar la Playera' });
      }
    },
  
    // Eliminar Playera
    eliminarPlayera: async (req, res) => {
      try {
        const { id } = req.params;
        const deleted = await Playera.destroy({ where: { id } });
  
        if (!deleted) {
          return res.status(404).json({ error: 'Playera no encontrada' });
        }
  
        res.json({ mensaje: 'Playera eliminada con éxito' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar la Playera' });
      }
    },
  
    // Buscar por nombre (búsqueda simple)
    buscarPlayeras: async (req, res) => {
      try {
        const { query } = req.params;
  
        const results = await Playera.findAll({
          where: {
            nombre: {
              [Op.iLike]: `%${query}%`,
            },
          },
        });
  
        res.json(results);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al buscar Playeras' });
      }
    },
  
    // Búsqueda avanzada
    buscarPlayerasAvanzados: async (req, res) => {
      try {
        const { nombre, minPrecio, maxPrecio } = req.body;
        const { Op } = require('sequelize');
  
        const condiciones = {};
  
        if (nombre) {
          condiciones.nombre = { [Op.iLike]: `%${nombre}%` };
        }
  
        if (minPrecio || maxPrecio) {
          condiciones.precio = {};
          if (minPrecio) condiciones.precio[Op.gte] = minPrecio;
          if (maxPrecio) condiciones.precio[Op.lte] = maxPrecio;
        }
  
        const results = await Playera.findAll({ where: condiciones });
        res.json(results);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error en búsqueda avanzada' });
      }
    },
  
};

module.exports = PlayeraController;
