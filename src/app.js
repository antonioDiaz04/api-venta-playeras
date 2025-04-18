const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const { conectarDB } = require("./config/conexion");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

conectarDB();

// Lee los orígenes permitidos desde .env o usa http://localhost:4200 como predeterminado
const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map(origin => origin.trim())
  : ['http://localhost:4200']; // default para desarrollo

// Middleware de CORS
app.use(cors({
  origin: corsOrigins,
  credentials: true // si vas a usar cookies o headers de autenticación
}));

app.use(cookieParser());
app.use(express.json());

// Solo habilitamos los mensajes por consola en el modo de desarrollo
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Ruta dinámica para la API
const apiVersion = process.env.API_VERSION || "v1"; // Si no se define, usa 'v1'

// Rutas padres
app.use(`/api/${apiVersion}/playera`, require("./routes/PlayeraRouter"));

module.exports = app;
