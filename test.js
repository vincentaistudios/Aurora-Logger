const logger = require('./logger');

/**
 * Script de Teste para o Aurora Logger
 * 
 * Demonstra os diferentes níveis de log e a formatação visual.
 */

console.log('\n--- 🎨 Teste de Cores e Níveis ---\n');

// Teste de Níveis Padrão
logger.info('Este é um log de informação normal.');
logger.warn('Cuidado! Este é um aviso amarelo.');
logger.error('Erro! Algo deu errado (vermelho).');
logger.debug('Debug: Detalhes técnicos (magenta) - pode não aparecer se LOG_LEVEL=info');

console.log('\n--- ✅ Teste de Helpers Visuais ---\n');

// Teste de Helpers Customizados
logger.success('Operação concluída com sucesso! (Verde)');
logger.fail('Falha na operação crítica! (Vermelho)');

console.log('\n--- 🧩 Teste de Objeto/Erro ---\n');

// Teste com Objetos e Erros
logger.info({ usuario: 'admin', id: 123, action: 'login' }, 'Usuário logado');
logger.error(new Error('Falha de conexão com o banco de dados'), 'Erro crítico no sistema');

console.log('\n--- 👶 Teste de Child Logger (Baileys) ---\n');

// Teste de Child Logger
const child = logger.child({ module: 'baileys' });
child.info('Log vindo do módulo filho');
