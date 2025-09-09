const {Pool} = require('pg');
require('dotenv').config();

const requiredEnvVars = [
    'DB_USER',
    'DB_PASSWORD',
    'DB_HOST',
    'DB_PORT',
    'DB_NAME'
];
  
const allEnvVarsDefined = requiredEnvVars.every(envVar => {
    if (!process.env[envVar]) {  
        console.error(`>> Erro: Variável de ambiente ${envVar} não definida.`);
        return false;
    }
    return true;
});
  
if (!allEnvVarsDefined) {
    console.error('>> Por favor, verifique o arquivo .env e certifique-se de que todas as variáveis necessárias estão definidas.');
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