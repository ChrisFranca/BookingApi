const { query } = require('../src/config/database');

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS visits (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    visit_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(50) DEFAULT 'scheduled',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
`;

const createVisitsTable = async () => {

    try{
        console.log('>>> script init-db.js começou...');
        console.log('>> Criando tabela de visitas...');
        await query(createTableQuery);
        console.log('>> Tabela de visitas criada com sucesso');
    } catch (error) {
        console.error('>> Erro ao criar tabela de visitas:', error.message);
    }
};

const ensureTableExists = async () => {
    try {
        const checkTableQuery = `
            SELECT to_regclass('public.visits');
        `;
        const result = await query(checkTableQuery);
        const tableExists = result.rows[0].to_regclass !== null;

        if (tableExists) {
            console.log('>> A tabela "visits" foi criada com sucesso ou já existia.');
        } else {
            console.error('>> Falha na criação da tabela "visits".');
        }

    } catch (error) {
        console.error('>> Erro durante o processo de verificação da tabela:', error.message);
    }
};

createVisitsTable();
ensureTableExists();