# Setup Google Sheets para Bibica Confeitaria

## 1. Preparação da Planilha

Crie uma planilha no Google Sheets com a aba "Produtos" e as seguintes colunas **em inglês**:

| A  | B    | C           | D     | E        | F        | G                 | H         |
|----|------|-------------|-------|----------|----------|-------------------|-----------|
| id | name | description | price | category | imageUrl | discountEligible  | variants  |

### Exemplos de dados:

```
trufa-classica-70 | Clássica 70% | Ganache de chocolate 70% com toque de baunilha | 6.0 | trufas | /chocolate-truffle-with-ganache-filling.png | true | 
pudim-p-600g | Pudim P (600-700g) | Serve 6–8 porções | 45.0 | pudins | /medium-flan-pudding-dessert.png | false | [{"id":"tradicional","label":"Tradicional"},{"id":"chocolate","label":"Chocolate"}]
```

### Notas importantes:
- **id**: Identificador único do produto (ex: trufa-classica-70, pudim-mini)
- **name**: Nome do produto para exibição
- **description**: Descrição detalhada
- **price**: Preço em número decimal (use . como separador)
- **category**: Categoria simples (trufas, pudins, geladinhos)
- **imageUrl**: Caminho local (/imagem.png) ou FILE_ID do Google Drive
- **discountEligible**: true/false, 1/0, sim/não
- **variants**: JSON array ou formato simples "id:label,id2:label2"

## 2. Google Cloud Setup

1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie ou selecione um projeto
3. Habilite a **Google Sheets API**
4. Vá em **IAM & Admin > Service Accounts**
5. Clique **"Create Service Account"**
6. Dê um nome (ex: "bibica-sheets-reader")
7. Na tela de roles, adicione **"Viewer"** (opcional, mas recomendado)
8. Finalize a criação

## 3. Baixar Credenciais

1. Na lista de Service Accounts, clique no que você criou
2. Vá na aba **"Keys"**
3. Clique **"Add Key" > "Create new key"**
4. Escolha **JSON** e faça o download
5. Abra o JSON e copie:
   - `client_email` → vai para `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` → vai para `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`

## 4. Compartilhar Planilha

1. Na sua planilha do Google Sheets, clique **"Compartilhar"**
2. Cole o email do service account (client_email do JSON)
3. Defina permissão como **"Visualizador"**
4. Envie o convite

## 5. Configurar Variáveis

Crie o arquivo `.env.local` na raiz do projeto:

```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=seu-bot@seu-projeto.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSUA_CHAVE_PRIVADA_AQUI\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_SPREADSHEET_ID=1AbCDeFG_hIJKLmnopQRstuVWxyz01234
GOOGLE_SHEETS_RANGE=Produtos!A2:H
```

⚠️ **Importante**: Para a `PRIVATE_KEY`, mantenha os `\n` para quebras de linha

## 6. Testar Integração

Endpoints disponíveis:
- `GET /api/products` - Lista todos os produtos
- `GET /api/categories` - Lista todas as categorias

### Testar no navegador:
```
http://localhost:3001/api/products
http://localhost:3001/api/categories
http://localhost:3001/cardapio
```

### Testar com curl:
```bash
curl http://localhost:3001/api/products
curl http://localhost:3001/api/categories
```

## 7. Imagens do Google Drive

Para usar imagens do Google Drive:

1. Faça upload das imagens para o Google Drive
2. Para cada imagem, clique direito → "Compartilhar"
3. Defina permissão como "Qualquer pessoa com o link"
4. Copie o FILE_ID da URL ou o link completo
5. Cole na coluna **imageUrl** da planilha

O sistema automaticamente converte para URLs diretas que funcionam com Next.js Image.

## 8. Cache e Performance

- Os dados são cacheados por 5 minutos no servidor
- As APIs têm cache HTTP configurado
- Em produção, considere usar ISR (Incremental Static Regeneration)

## 9. Migração dos Componentes

Para migrar um componente do `data.ts` para Google Sheets:

### Server Components:
```typescript
// Antes:
import { products, categories } from '@/lib/data';

// Depois:
import { getProducts, getCategories } from '@/lib/data-sheets';
const products = await getProducts();
const categories = await getCategories();
```

### Client Components:
```typescript
// Use as APIs:
const { data: products } = useSWR('/api/products');
const { data: categories } = useSWR('/api/categories');
```

## Troubleshooting

### Erro de autenticação
- Verifique se as credenciais estão corretas
- Confirme se a planilha foi compartilhada com o service account

### Erro ao carregar imagens
- Verifique se as imagens do Drive têm permissão pública
- Confirme se o `next.config.mjs` permite `drive.google.com`

### Cache não atualiza
- Use `/api/products` para forçar nova busca
- Reinicie o servidor de desenvolvimento