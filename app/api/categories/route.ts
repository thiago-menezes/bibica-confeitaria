// /app/api/categories/route.ts
import { NextResponse } from "next/server";
import { getCategories } from "@/lib/sheets";

export async function GET() {
  try {
    const data = await getCategories();
    
    // Cache por 5 minutos (300 segundos)
    return NextResponse.json(data, { 
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });
  } catch (err: any) {
    console.error("Erro ao ler categorias:", err?.message || err);
    
    return NextResponse.json(
      { error: "Falha ao carregar categorias do Google Sheets." },
      { status: 500 }
    );
  }
}
