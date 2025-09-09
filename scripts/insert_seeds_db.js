require('dotenv').config();
const VisitRepository = require('../src/repositories/VisitRepository');

const seedData = [
    // Visitas agendadas para esta semana
    {
        property_id: 1,
        client_name: 'João Silva',
        client_phone: '(11) 98765-4321',
        client_email: 'joao@email.com',
        visit_date: '2025-09-10T10:00:00-03:00',
        status: 'scheduled',
        notes: 'Interessado em apartamentos com 2 quartos'
    },
    {
        property_id: 1,
        client_name: 'João Silva',
        client_phone: '(11) 98765-4321',
        client_email: 'joao@email.com',
        visit_date: '2025-09-10T10:00:00-03:00',
        status: 'scheduled',
        notes: 'Interessado em apartamentos com 2 quartos'
    },
    {
        property_id: 2,
        client_name: 'Maria Santos',
        client_phone: '(11) 91234-5678',
        client_email: 'maria@email.com',
        visit_date: '2025-09-10T14:30:00-03:00',
        status: 'scheduled',
        notes: 'Procura casa com piscina'
    },
    {
        property_id: 3,
        client_name: 'Carlos Oliveira',
        client_phone: '(11) 92345-6789',
        client_email: 'carlos@email.com',
        visit_date: '2025-09-11T11:00:00-03:00',
        status: 'scheduled',
        notes: 'Visita técnica'
    },
    {
        property_id: 1,
        client_name: 'Ana Pereira',
        client_phone: '(11) 94567-8901',
        client_email: 'ana@email.com',
        visit_date: '2025-09-11T15:30:00-03:00',
        status: 'scheduled',
        notes: 'Segunda visita'
    },
    {
        property_id: 2,
        client_name: 'Pedro Costa',
        client_phone: '(11) 95678-9012',
        client_email: 'pedro@email.com',
        visit_date: '2025-09-12T09:00:00-03:00',
        status: 'scheduled',
        notes: 'Visita com arquiteto'
    },
    
    // Visitas da semana passada (completadas)
    {
        property_id: 3,
        client_name: 'Fernanda Lima',
        client_phone: '(11) 96789-0123',
        client_email: 'fernanda@email.com',
        visit_date: '2025-09-03T10:00:00-03:00',
        status: 'completed',
        notes: 'Muito interessada, pediu proposta'
    },
    {
        property_id: 1,
        client_name: 'Ricardo Almeida',
        client_phone: '(11) 97890-1234',
        client_email: 'ricardo@email.com',
        visit_date: '2025-09-03T14:00:00-03:00',
        status: 'completed',
        notes: 'Não compareceu'
    },
    {
        property_id: 2,
        client_name: 'Juliana Rocha',
        client_phone: '(11) 98901-2345',
        client_email: 'juliana@email.com',
        visit_date: '2025-09-04T16:00:00-03:00',
        status: 'completed',
        notes: 'Gostou do imóvel, vai pensar'
    },
    {
        property_id: 3,
        client_name: 'Marcos Souza',
        client_phone: '(11) 99012-3456',
        client_email: 'marcos@email.com',
        visit_date: '2025-09-05T11:30:00-03:00',
        status: 'completed',
        notes: 'Visita técnica'
    },
    {
        property_id: 1,
        client_name: 'Patrícia Costa',
        client_phone: '(11) 90123-4567',
        client_email: 'patricia@email.com',
        visit_date: '2025-09-06T09:30:00-03:00',
        status: 'completed',
        notes: 'Solicitou documentação'
    },
    
    // Visitas futuras
    {
        property_id: 2,
        client_name: 'Lucas Mendes',
        client_phone: '(11) 91234-5678',
        client_email: 'lucas@email.com',
        visit_date: '2025-09-17T10:00:00-03:00',
        status: 'scheduled',
        notes: 'Visita com a família'
    },
    {
        property_id: 3,
        client_name: 'Camila Alves',
        client_phone: '(11) 92345-6789',
        client_email: 'camila@email.com',
        visit_date: '2025-09-17T14:00:00-03:00',
        status: 'scheduled',
        notes: 'Interesse comercial'
    },
    {
        property_id: 1,
        client_name: 'Rafaela Santos',
        client_phone: '(11) 93456-7890',
        client_email: 'rafaela@email.com',
        visit_date: '2025-09-18T11:00:00-03:00',
        status: 'scheduled',
        notes: 'Visita técnica'
    },
    {
        property_id: 2,
        client_name: 'Bruno Oliveira',
        client_phone: '(11) 94567-8901',
        client_email: 'bruno@email.com',
        visit_date: '2025-09-19T15:30:00-03:00',
        status: 'scheduled',
        notes: 'Segunda visita'
    },
    {
        property_id: 3,
        client_name: 'Amanda Costa',
        client_phone: '(11) 95678-9012',
        client_email: 'amanda@email.com',
        visit_date: '2025-09-20T09:00:00-03:00',
        status: 'scheduled',
        notes: 'Visita com engenheiro'
    },
    
    // Visitas canceladas
    {
        property_id: 1,
        client_name: 'Gustavo Pereira',
        client_phone: '(11) 96789-0123',
        client_email: 'gustavo@email.com',
        visit_date: '2025-09-05T14:00:00-03:00',
        status: 'cancelled',
        notes: 'Cancelou por motivo pessoal'
    },
    {
        property_id: 2,
        client_name: 'Larissa Martins',
        client_phone: '(11) 97890-1234',
        client_email: 'larissa@email.com',
        visit_date: '2025-09-06T16:30:00-03:00',
        status: 'cancelled',
        notes: 'Encontrou outro imóvel'
    },
    {
        property_id: 3,
        client_name: 'Diego Almeida',
        client_phone: '(11) 98901-2345',
        client_email: 'diego@email.com',
        visit_date: '2025-09-09T10:30:00-03:00',
        status: 'cancelled',
        notes: 'Data remarcada para próxima semana'
    },
    {
        property_id: 1,
        client_name: 'Vanessa Lima',
        client_phone: '(11) 99012-3456',
        client_email: 'vanessa@email.com',
        visit_date: '2025-09-10T15:00:00-03:00',
        status: 'cancelled',
        notes: 'Não atendeu o telefone para confirmação'
    },
    {
        property_id: 2,
        client_name: 'Marcelo Costa',
        client_phone: '(11) 90123-4567',
        client_email: 'marcelo@email.com',
        visit_date: '2025-09-11T11:30:00-03:00',
        status: 'cancelled',
        notes: 'Desistiu da compra'
    }
];

async function insertSeeds() {
    try {
        console.log('>> Iniciando inserção de seeds...');
        
        for (const visitData of seedData) {
            try {
                await VisitRepository.create(visitData);
                console.log(`>> Visita para ${visitData.client_name} inserida com sucesso`);
            } catch (error) {
                console.error(`>> Erro ao inserir visita para ${visitData.client_name}:`, error.message);
            }
        }
        
        console.log('>> Processo de inserção de seeds concluído');
    } catch (error) {
        console.error('>> Erro durante o processo de seed:', error);
    } finally {
        process.exit(0);
    }
}

insertSeeds();