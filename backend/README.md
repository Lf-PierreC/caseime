# API da Lista de Presentes

Esta API permite gerenciar os presentes da lista de casamento, incluindo buscar todos os presentes e atualizar o status de presenteado.

## Instalação

```bash
cd backend
npm install
```

## Executar o servidor

```bash
npm start
```

O servidor rodará na porta 3000 (ou na porta definida na variável de ambiente PORT).

## Endpoints

### GET /api/presentes
Busca todos os presentes da lista.

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "Geladeira",
    "preco": 2800,
    "presenteado": false,
    "categoria": "Eletrodomésticos",
    "descricao": "Geladeira moderna",
    "imagem": "/images/geladeira.jpg"
  }
]
```

### PATCH /api/presentes/:id
Atualiza o status de um presente específico.

**Parâmetros:**
- `id`: ID do presente

**Body:**
```json
{
  "presenteado": true
}
```

**Resposta:**
```json
{
  "message": "Presente atualizado com sucesso",
  "presente": {
    "id": 1,
    "nome": "Geladeira",
    "preco": 2800,
    "presenteado": true,
    "categoria": "Eletrodomésticos",
    "descricao": "Geladeira moderna",
    "imagem": "/images/geladeira.jpg"
  }
}
```

## Teste da API

Para testar se a API está funcionando corretamente:

```bash
node test-api.js
```

## Estrutura de arquivos

```
backend/
├── data/
│   └── presentes.json    # Dados dos presentes
├── server.js             # Servidor principal
├── test-api.js           # Script de teste
├── package.json
└── README.md
```

## Deployment

Para publicar em produção:

1. Configure as variáveis de ambiente necessárias
2. Certifique-se de que o arquivo `presentes.json` tenha permissões de escrita
3. Configure CORS para permitir requisições do seu domínio frontend
4. Atualize a URL da API no frontend (arquivo `giftlist/src/config/api.ts`)

### Exemplo de configuração para produção:

```javascript
// No arquivo api.ts do frontend
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://sua-api.herokuapp.com' // Substitua pela URL real
  : 'http://localhost:3000';
```