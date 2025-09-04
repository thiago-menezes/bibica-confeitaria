// lib/data-sheets.ts - Nova implementação usando Google Sheets
import { getProducts as getSheetsProducts, getCategories as getSheetsCategories } from './sheets';
import { Product, Category } from './sheets';

// Re-exporta os tipos para compatibilidade
export type { Product, Category };

// CartItem mantido do data.ts original
export interface CartItem {
  productId: string;
  variantId?: string;
  unitPrice: number;
  qty: number;
  name: string;
  variant?: string;
}

// Cache em memória para evitar muitas chamadas ao Google Sheets
let productsCache: Product[] | null = null;
let categoriesCache: Category[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos em millisegundos

async function getProductsFromSheets(): Promise<Product[]> {
  const now = Date.now();
  
  // Se tem cache válido, retorna
  if (productsCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return productsCache;
  }
  
  productsCache = await getSheetsProducts();
  cacheTimestamp = now;
  return productsCache;
}

async function getCategoriesFromSheets(): Promise<Category[]> {
  const now = Date.now();
  
  // Se tem cache válido, retorna
  if (categoriesCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return categoriesCache;
  }
  
  categoriesCache = await getSheetsCategories();
  cacheTimestamp = now;
  return categoriesCache;
}

// Funções públicas que mantêm a mesma interface do data.ts original
// Nota: para usar versões síncronas, use as funções getProducts() e getCategories()
export let products: Product[] = [];
export let categories: Category[] = [];

// Funções helper para uso assíncrono
export async function getProducts(): Promise<Product[]> {
  return await getProductsFromSheets();
}

export async function getCategories(): Promise<Category[]> {
  return await getCategoriesFromSheets();
}

// Limpa o cache (útil para desenvolvimento)
export function clearCache(): void {
  productsCache = null;
  categoriesCache = null;
  cacheTimestamp = 0;
}
