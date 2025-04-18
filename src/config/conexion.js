const { Sequelize } = require('sequelize');

// Crear una instancia de Sequelize para conectar con PostgreSQL
const sequelize = new Sequelize('dbplayerasymas', 'admin', 'aCHQIocFPdagugh2boxL94QJebi9Ypnd', {
  host: 'dpg-cvvi4jjuibrs73bfmpq0-a.oregon-postgres.render.com',
  dialect: 'postgres',
    dialectOptions: {
        ssl: {
        require: true, // true para usar SSL
        rejectUnauthorized: false, // false para evitar errores de certificado no autorizado
        },
    },
});

// Verificar la conexión con la base de datos
const conectarDB = async () => {
    try {
        await sequelize.authenticate();  // Intenta autenticar la conexión
        console.log('Conexión exitosa a PostgreSQL');
    } catch (err) {
        console.error('Error de conexión:', err.message);
    }
};

module.exports = { sequelize, conectarDB };
