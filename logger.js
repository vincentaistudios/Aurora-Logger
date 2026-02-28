const pino = require('pino');
const chalk = require('chalk');

// Definições de níveis e cores
const levels = {
    trace: 10, debug: 20, info: 30, warn: 40, error: 50, fatal: 60
};

// Stream de formatação bonita (Pretty Printer Customizado)
const prettyStream = {
    write: (msg) => {
        try {
            // Tenta parsear a mensagem JSON do Pino
            const logObj = typeof msg === 'string' ? JSON.parse(msg) : msg;
            
            // Extrai dados básicos
            const time = logObj.time ? new Date(logObj.time).toLocaleTimeString() : new Date().toLocaleTimeString();
            const level = logObj.level || 30;
            const message = logObj.msg || JSON.stringify(logObj);
            
            // Define cores e ícones baseados no nível
            let color = chalk.blue;
            let icon = 'ℹ';
            
            if (level >= 50) { // Error/Fatal
                color = chalk.red;
                icon = '✖';
            } else if (level >= 40) { // Warn
                color = chalk.yellow;
                icon = '⚠';
            } else if (level >= 20 && level < 30) { // Debug
                color = chalk.magenta;
                icon = '⚙';
            }

            // Exemplo de FILTRO DE RUÍDO (Opcional)
            // Ignora logs específicos do Baileys ou outros libs
            if (message && message.includes('Timeout in AwaitingInitialSync')) return;

            // Monta a linha de log: [HORA] ÍCONE MENSAGEM
            const output = `${chalk.gray(`[${time}]`)} ${color(icon)} ${message}\n`;
            process.stdout.write(output);

            // Se houver erro anexado, imprime o stack trace em vermelho
            if (logObj.err || logObj.error) {
                const errObj = logObj.err || logObj.error;
                const errStack = errObj.stack || errObj.message || errObj;
                process.stdout.write(chalk.red(`${errStack}\n`));
            }

        } catch (e) {
            // Fallback caso o parse falhe
            process.stdout.write(msg);
        }
    }
};

// Configuração do Pino
const pinoLogger = pino({
    level: process.env.LOG_LEVEL || 'info',
    base: null, // Remove pid/hostname para limpar o log
    timestamp: pino.stdTimeFunctions.isoTime,
}, prettyStream);

// Wrapper com Helpers Visuais
const logger = {
    // Métodos padrão do Pino
    info: (obj) => pinoLogger.info(obj),
    warn: (obj) => pinoLogger.warn(obj),
    error: (obj) => pinoLogger.error(obj),
    debug: (obj) => pinoLogger.debug(obj),
    
    // Helper visual de SUCESSO (Verde com Check)
    success: (msg) => {
        const time = new Date().toLocaleTimeString();
        console.log(`${chalk.gray(`[${time}]`)} ${chalk.green('✔')} ${msg}`);
    },
    
    // Helper visual de FALHA (Vermelho com X)
    fail: (msg) => {
        const time = new Date().toLocaleTimeString();
        console.log(`${chalk.gray(`[${time}]`)} ${chalk.red('✖')} ${msg}`);
    },
    
    // Compatibilidade com Baileys (retorna child logger)
    child: (bindings) => pinoLogger.child(bindings)
};

module.exports = logger;
