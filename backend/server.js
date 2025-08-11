const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://modelgiftlist.netlify.app'] // ✅ seu domínio real no Netlify
    : ['http://localhost:5173', 'http://localhost:3000']
}));
app.use(express.json());

// Servir imagens da pasta /public/imagens
app.use('/imagens', express.static(path.join(__dirname, 'public/imagens')));

// Rotas da API
app.get('/api/presentes', (req, res) => {
  try {
    // Limpar cache do require para sempre pegar dados atualizados
    const filePath = path.join(__dirname, 'data', 'presentes.json');
    delete require.cache[require.resolve('./data/presentes.json')];
    const presentes = require('./data/presentes.json');
    res.json(presentes);
  } catch (error) {
    console.error('Erro ao buscar presentes:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.patch('/api/presentes/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { presenteado } = req.body;
    
    console.log(`📝 Atualizando presente ID ${id} para ${presenteado ? 'presenteado' : 'disponível'}`);
    
    // Ler o arquivo JSON atual
    const filePath = path.join(__dirname, 'data', 'presentes.json');
    const data = fs.readFileSync(filePath, 'utf8');
    let presentes = JSON.parse(data);
    
    // Encontrar e atualizar o presente
    const presenteIndex = presentes.findIndex(p => p.id === parseInt(id));
    
    if (presenteIndex === -1) {
      console.log(`❌ Presente ID ${id} não encontrado`);
      return res.status(404).json({ error: 'Presente não encontrado' });
    }
    
    const statusAnterior = presentes[presenteIndex].presenteado;
    presentes[presenteIndex].presenteado = presenteado;
    
    // Salvar de volta no arquivo
    fs.writeFileSync(filePath, JSON.stringify(presentes, null, 2), 'utf8');
    console.log(`✅ Presente "${presentes[presenteIndex].nome}" atualizado: ${statusAnterior} → ${presenteado}`);
    
    // Limpar cache do require para próximas requisições
    delete require.cache[require.resolve('./data/presentes.json')];
    
    res.json({ 
      message: 'Presente atualizado com sucesso',
      presente: presentes[presenteIndex]
    });
    
  } catch (error) {
    console.error('❌ Erro ao atualizar presente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

