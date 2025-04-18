const { Sequelize } = require('sequelize');

// Configuración de Sequelize para conectar con PostgreSQL
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

module.exports = sequelize;
