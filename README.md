<p align="center">
  <img src="capa-aurora-logger.png" alt="Banner Aurora Logger" width="80%">
</p>

<h1 align="center">🌌 Aurora Logger</h1>

<p align="center">
  <em>O sistema de logging estruturado e monitoramento de IA do Vincent AI Studios.</em>
</p>

---

## 📖 O que é o Aurora Logger?

Quando construímos agentes de Inteligência Artificial e aplicações em nuvem, o `console.log()` tradicional deixa de ser suficiente. Precisamos entender o contexto, rastrear falhas de API e monitorar o "pensamento" da IA em tempo real.

O **Aurora Logger** é a ferramenta interna (agora Open Source) desenvolvida pelo **Vincent AI Studios** para monitorar a IA "Aurora". Ele formata os logs de maneira estruturada, facilitando o debug em ambientes Cloud (como AWS e GCP) e mantendo o terminal limpo e legível durante o desenvolvimento local.

## ✨ Principais Recursos

* **Estruturação de Dados:** Logs organizados que facilitam a leitura por humanos e a ingestão por sistemas de monitoramento na nuvem.
* **Foco em IA:** Ideal para rastrear prompts, respostas de LLMs e falhas de integração.
* **Leve e Nativo:** Feito em Node.js (`logger.js`), sem depender de bibliotecas externas pesadas.
* **Níveis de Severidade:** Separação clara entre `INFO`, `WARN`, `ERROR` e `DEBUG`.

---

## 🚀 Como utilizar

O sistema foi desenhado para ser "Plug and Play". Basta importar o arquivo principal e começar a monitorar a sua aplicação.

### 1. Importação Básica
Adicione o arquivo `logger.js` ao seu projeto e importe-o onde for necessário:

```javascript
const logger = require('./logger');

// Exemplo de log de informação
logger.info('Iniciando o cérebro da Aurora...', { model: 'gemini-pro', environment: 'production' });

// Exemplo de log de erro capturado (Try/Catch)
try {
    // Sua lógica de IA aqui
} catch (error) {
    logger.error('Falha ao gerar resposta da IA', error, { userId: '12345' });
}
