"use client"

import { useState, useEffect } from "react"
import useSWR from "swr"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryTabs } from "@/components/category-tabs"
import { ProductCard } from "@/components/product-card"
import { CartBar } from "@/components/cart-bar"
import { DiscountBanner } from "@/components/discount-banner"
import { Toaster } from "@/components/ui/toaster"
import { LoadingSpinner } from "@/components/loading-spinner"
import type { Product, Category } from "@/lib/sheets"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function CardapioPage() {
  const [activeCategory, setActiveCategory] = useState("trufas")
  
  // Fetch data from APIs
  const { data: products = [], error: productsError, isLoading: productsLoading } = useSWR<Product[]>('/api/products', fetcher)
  const { data: categories = [], error: categoriesError, isLoading: categoriesLoading } = useSWR<Category[]>('/api/categories', fetcher)

  // Trigger cart update events when localStorage changes
  useEffect(() => {
    const originalSetItem = localStorage.setItem
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, [key, value])
      if (key === "bibica_cart") {
        window.dispatchEvent(new Event("cartUpdated"))
      }
    }
  }, [])

  // Update active category when categories load
  useEffect(() => {
    if (categories.length > 0 && !categories.find(c => c.id === activeCategory)) {
      setActiveCategory(categories[0].id)
    }
  }, [categories, activeCategory])

  // Loading state
  if (productsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen pb-24 sm:pb-20">
        <Header />
        <main className="container px-4 py-6 sm:py-8">
          <div className="max-w-6xl mx-auto text-center py-12">
            <LoadingSpinner />
            <p className="mt-4 text-muted-foreground">Carregando cardápio...</p>
          </div>
        </main>
        <Footer />
        <CartBar />
        <Toaster />
      </div>
    )
  }

  // Error state
  if (productsError || categoriesError) {
    return (
      <div className="min-h-screen pb-24 sm:pb-20">
        <Header />
        <main className="container px-4 py-6 sm:py-8">
          <div className="max-w-6xl mx-auto text-center py-12">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Erro ao carregar cardápio</h1>
            <p className="text-muted-foreground mb-4">
              Não foi possível carregar os dados do cardápio. Tente novamente.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
            >
              Recarregar página
            </button>
          </div>
        </main>
        <Footer />
        <CartBar />
        <Toaster />
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24 sm:pb-20">
      <Header />
      <main className="container px-4 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-balance">Cardápio</h1>
            <DiscountBanner />
          </div>

          <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

          {categories.map((category) => {
            const categoryProducts = products.filter((product) => product.categoryId === category.id)

            return (
              <section key={category.id} id={category.id} className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-pink-600 text-balance">
                    {category.name.toUpperCase()}
                  </h2>
                  {category.id === "trufas" && (
                    <p className="text-sm sm:text-base text-muted-foreground text-pretty">
                      Preços por unidade. Embalagem individual inclusa.
                    </p>
                  )}
                  {category.id === "pudins" && (
                    <p className="text-sm sm:text-base text-muted-foreground text-pretty">
                      Produção sob encomenda. Sugerimos 48h de antecedência para pudins inteiros.
                    </p>
                  )}
                  {category.id === "geladinhos" && (
                    <p className="text-sm sm:text-base text-muted-foreground text-pretty">
                      Receita cremosa, sabores de infância com toque gourmet.
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {categoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {category.id === "geladinhos" && (
                  <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 sm:p-6 text-center">
                    <h3 className="font-semibold text-base sm:text-lg mb-2 text-balance">Combo Sugerido</h3>
                    <p className="text-sm sm:text-base text-muted-foreground text-pretty">
                      Kit Festa (30 un sortidas) — R$ 168,00 (já com 10% off)
                    </p>
                  </div>
                )}
              </section>
            )
          })}

          <div className="bg-muted rounded-lg p-4 sm:p-6 space-y-4">
            <h3 className="font-semibold text-base sm:text-lg text-balance">Observações importantes:</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Alergênicos:</h4>
                <p className="text-pretty">
                  Nossos produtos podem conter leite, ovos, amendoim, castanhas e traços de glúten.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Prazos:</h4>
                <p>Trufas/geladinhos: 24h | Pudins inteiros: 48h</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Personalização:</h4>
                <p className="text-pretty">Cores, tags e caixas especiais para eventos sob consulta.</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Entrega:</h4>
                <p className="text-pretty">Combinamos a melhor janela para você.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CartBar />
      <Toaster />
    </div>
  )
}
