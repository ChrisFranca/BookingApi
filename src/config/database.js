const {Pool} = require('pg');

if (!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST || !process.env.DB_PORT || !process.env.DB_NAME) {
    console.error('Erro: Variáveis de ambiente do banco de dados não configuradas corretamente');
    process.exit(1);
}

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10),
});

const testConnection = async () => {
    const client = await pool.connect();
    try {
        await client.query('SELECT NOW()');
        console.log('Database connection successful');
        return true;
    } catch (error) {
        console.error('Database connection error:', error.message);
        throw error;
    } finally {
        client.release();
    }
};

module.exports = {
    pool,
    testConnection,
    query: (text, params) => pool.query(text, params)
};