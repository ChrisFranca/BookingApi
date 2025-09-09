// test-visit-repo.js
require('dotenv').config();
const visitRepository = require('./src/repositories/VisitRepository');

async function testVisitRepository() {
  try {
    console.log('>> Testando repositório de visitas...');
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Teste de criação
    console.log('\n>> Criando nova visita...');
    const newVisit = await visitRepository.create({
      property_id: 1,
      client_name: 'João Silva',
      client_phone: '11999998888',
      client_email: 'joao@email.com',
      visit_date: tomorrow,
      notes: 'Interessado em apartamentos de 2 quartos'
    });
    console.log('>> Visita agendada:', newVisit);

    // Teste de busca por ID
    console.log('\n>> Buscando visita por ID...');
    const foundVisit = await visitRepository.findById(newVisit.id);
    console.log('>> Visita encontrada:', foundVisit);

    // Teste de atualização de status
    console.log('\n>> Atualizando status da visita...');
    const updatedVisit = await visitRepository.updateStatus(newVisit.id, 'completed');
    console.log('>> Status atualizado:', updatedVisit);

    // Teste de busca por imóvel
    console.log('\n>> Buscando visitas do imóvel 1...');
    const propertyVisits = await visitRepository.findByProperty(1);
    console.log(`>> ${propertyVisits.length} visitas encontradas para o imóvel`);

    // Teste de busca por período
    console.log('\n>> Buscando visitas para esta semana...');
    const nextWeek = new Date(now);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const visitsThisWeek = await visitRepository.findByDateRange(now, nextWeek);
    console.log(`>> ${visitsThisWeek.length} visitas agendadas para esta semana`);

    // Lista todas as visitas
    console.log('\n>> Listando todas as visitas...');
    const allVisits = await visitRepository.findAll();
    console.log(`>> Total de visitas no banco: ${allVisits.length}`);

    // Limpeza (opcional)
    // await visitRepository.delete(newVisit.id);
    // console.log('\n>> Visita de teste removida');

  } catch (error) {
    console.error('>> Erro no teste do repositório:', error.message);
    process.exit(1);
  }
}

testVisitRepository();