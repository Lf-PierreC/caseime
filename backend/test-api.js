// Script de teste para a API
const http = require('http');

const BASE_URL = 'https://giftlist-api-kj59.onrender.com';

// Função helper para fazer requisições HTTP
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = http.request(requestOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ ok: res.statusCode < 400, json: () => Promise.resolve(jsonData) });
        } catch (e) {
          resolve({ ok: res.statusCode < 400, json: () => Promise.resolve(data) });
        }
      });
    });

    req.on('error', reject);

    if (options.body) {
      req.write(options.body);
    }

    req.end();
  });
}

async function testAPI() {
  try {
    console.log('🧪 Testando API dos presentes...\n');
    
    // Teste 1: Buscar todos os presentes
    console.log('1. Buscando todos os presentes...');
    const response = await makeRequest(`${BASE_URL}/api/presentes`);
    const presentes = await response.json();
    console.log(`✅ Encontrados ${presentes.length} presentes\n`);
    
    // Teste 2: Atualizar status de um presente
    const primeiroPresente = presentes[0];
    console.log(`2. Atualizando presente: ${primeiroPresente.nome}`);
    console.log(`   Status atual: ${primeiroPresente.presenteado ? 'Presenteado' : 'Disponível'}`);
    
    const updateResponse = await fetch(`${BASE_URL}/api/presentes/${primeiroPresente.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ presenteado: !primeiroPresente.presenteado })
    });
    
    const resultado = await updateResponse.json();
    console.log(`✅ ${resultado.message}`);
    console.log(`   Novo status: ${resultado.presente.presenteado ? 'Presenteado' : 'Disponível'}\n`);
    
    // Aguardar um pouco para garantir que o arquivo foi salvo
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Teste 3: Verificar se a mudança persistiu
    console.log('3. Verificando se a mudança persistiu...');
    const verifyResponse = await fetch(`${BASE_URL}/api/presentes`);
    const presentesAtualizados = await verifyResponse.json();
    const presenteVerificado = presentesAtualizados.find(p => p.id === primeiroPresente.id);
    
    if (presenteVerificado.presenteado === !primeiroPresente.presenteado) {
      console.log('✅ Mudança persistida com sucesso!');
    } else {
      console.log('❌ Mudança não foi persistida');
    }
    
  } catch (error) {
    console.error('❌ Erro no teste:', error.message);
  }
}

// Executar apenas se chamado diretamente
if (require.main === module) {
  testAPI();
}

module.exports = testAPI;