// /app/api/products/route.ts
import { NextResponse } from "next/server";
import { getProducts } from "@/lib/sheets";

export async function GET() {
  try {
    const data = await getProducts();
    
    // Cache por 5 minutos (300 segundos)
    return NextResponse.json(data, { 
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });
  } catch (err: any) {
    console.error("Erro ao ler planilha:", err?.message || err);
    
    return NextResponse.json(
      { error: "Falha ao carregar produtos do Google Sheets." },
      { status: 500 }
    );
  }
}
