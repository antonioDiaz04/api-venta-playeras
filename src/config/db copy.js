const { Pool } = require('pg');

const pool = new Pool({
    user: 'admin',
    host: 'dpg-cvvi4jjuibrs73bfmpq0-a.oregon-postgres.render.com',
    database: 'dbplayerasymas',
    password: 'aCHQIocFPdagugh2boxL94QJebi9Ypnd',
    port: 5432,
    ssl: true
});


// Exportar ambos
module.exports =
    pool;
