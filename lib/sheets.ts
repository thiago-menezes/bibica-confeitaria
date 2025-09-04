// /lib/sheets.ts
import { google } from "googleapis";

// Mantém a interface existente do projeto
export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  discountEligible: boolean;
  variants?: Array<{
    id: string;
    label: string;
  }>;
}

export interface Category {
  id: string;
  name: string;
}

/**
 * Converte um link do Drive ou um FILE_ID em link direto para <img src="">
 * Aceita:
 *  - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 *  - https://drive.google.com/open?id=FILE_ID
 *  - FILE_ID puro
 */
export function driveToDirectUrl(input: string): string {
  if (!input) return "";

  // Se já for um ID "puro"
  if (/^[a-zA-Z0-9_-]{20,}$/.test(input)) {
    return `https://drive.google.com/uc?export=view&id=${input}`;
  }

  // Tenta extrair o FILE_ID de URLs comuns do Drive
  const idMatch =
    input.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1] ||
    input.match(/[?&]id=([a-zA-Z0-9_-]+)/)?.[1] ||
    input.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)?.[1] ||
    input.match(/drive-viewer\/([a-zA-Z0-9_-]+)/)?.[1];

  if (idMatch) {
    return `https://drive.google.com/uc?export=view&id=${idMatch}`;
  }

  // Se já for uma URL do drive.google.com mas não conseguiu extrair ID
  if (input.includes('drive.google.com')) {
    return input;
  }

  // fallback: retorna o input (pode ser uma URL já direta/externa ou caminho local)
  return input;
}

function getSheetsClient() {
  if (typeof window !== 'undefined') {
    throw new Error('getSheetsClient só pode ser chamado no servidor');
  }
  
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
  let key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY!;

  if (!email || !key) {
    throw new Error(
      "Variáveis GOOGLE_SERVICE_ACCOUNT_EMAIL e GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY são obrigatórias"
    );
  }

  // Ajuste caso a key venha com \n no .env (com aspas)
  key = key.replace(/\\n/g, "\n");

  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  return google.sheets({ version: "v4", auth });
}

/**
 * Parse das variantes no formato JSON ou lista separada por vírgula
 * Exemplo: [{"id":"tradicional","label":"Tradicional"},{"id":"chocolate","label":"Chocolate"}]
 * Ou: tradicional:Tradicional,chocolate:Chocolate
 */
function parseVariants(variantsStr: string): Array<{ id: string; label: string }> | undefined {
  if (!variantsStr?.trim()) return undefined;

  try {
    // Tenta parse JSON primeiro
    const parsed = JSON.parse(variantsStr);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // Se não for JSON, tenta formato simples: id:label,id2:label2
    const variants = variantsStr.split(',').map(v => {
      const [id, label] = v.split(':').map(s => s?.trim());
      return id && label ? { id, label } : null;
    }).filter(Boolean);
    
    return variants.length > 0 ? variants as Array<{ id: string; label: string }> : undefined;
  }

  return undefined;
}

export async function getProducts(): Promise<Product[]> {
  if (typeof window !== 'undefined') {
    throw new Error('getProducts só pode ser chamado no servidor');
  }
  
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;
  const range = process.env.GOOGLE_SHEETS_RANGE!;

  if (!spreadsheetId || !range) {
    throw new Error(
      "Variáveis GOOGLE_SHEETS_SPREADSHEET_ID e GOOGLE_SHEETS_RANGE são obrigatórias"
    );
  }

  const sheets = getSheetsClient();

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
    valueRenderOption: "UNFORMATTED_VALUE", // pega números como número
  });

  const rows = res.data.values || [];

  // Espera colunas: name | description | price | category | weight | imageUrl | id | discountEligible
  const products: Product[] = rows
    .filter((r) => r.length && r[0]) // precisa ter ao menos 'name'
    .map((r, index) => {
      const name = String(r[0] ?? "").trim();
      const description = String(r[1] ?? "").trim();
      const priceRaw = r[2];
      const category = String(r[3] ?? "").trim();
      const weight = String(r[4] ?? "").trim(); // Nova coluna weight
      const imageUrl = String(r[5] ?? "").trim();
      const id = String(r[6] ?? "").trim();
      const discountEligibleRaw = String(r[7] ?? "").toLowerCase();

      const price =
        typeof priceRaw === "number"
          ? priceRaw
          : Number(String(priceRaw ?? "0").replace(",", "."));

      const discountEligible = ['true', '1', 'sim', 'yes'].includes(discountEligibleRaw);
      
      // Gera ID único combinando ID da planilha + índice para evitar duplicatas
      const baseId = id || name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      
      const finalId = baseId ? `${baseId}-${index}` : `produto-${index}`;

      return {
        id: finalId,
        categoryId: category.toLowerCase().replace(/[^a-z0-9]/g, ''),
        name,
        description,
        price: Number.isFinite(price) ? Number(price) : 0,
        imageUrl: imageUrl.startsWith('/') ? imageUrl : (imageUrl ? driveToDirectUrl(imageUrl) : '/placeholder.jpg'),
        discountEligible,
      };
    });

  return products;
}

export async function getCategories(): Promise<Category[]> {
  const products = await getProducts();
  const categoryMap = new Map<string, string>();

  products.forEach(product => {
    if (!categoryMap.has(product.categoryId)) {
      // Capitaliza primeira letra para o nome de exibição
      const displayName = product.categoryId
        .charAt(0).toUpperCase() + product.categoryId.slice(1);
      categoryMap.set(product.categoryId, displayName);
    }
  });

  return Array.from(categoryMap.entries()).map(([id, name]) => ({
    id,
    name,
  }));
}
