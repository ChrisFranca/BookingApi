// test-db.js
require('dotenv').config();

async function testDatabaseConnection() {
  console.log('>> Testando conexão com o banco de dados...');
  
  try {
    // Importa o módulo de banco de dados apenas quando for executar o teste
    const { testConnection } = require('./../src/config/database');
    
    console.log('>> Tentando conectar ao banco de dados com as seguintes configurações:');
    console.log(`    - Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    console.log(`    - Database: ${process.env.DB_NAME}`);
    console.log(`    - User: ${process.env.DB_USER}`);
    
    await testConnection();
    console.log('>> Teste de conexão concluído com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('>> Falha ao conectar ao banco de dados:');
    console.error(error.message);
    console.log('\n>> Verifique se:');
    console.log('    1. O PostgreSQL está rodando');
    console.log('    2. As credenciais no arquivo .env estão corretas');
    console.log(`    3. O banco de dados "${process.env.DB_NAME}" existe`);
    process.exit(1);
  }
}

// Executa o teste
testDatabaseConnection();