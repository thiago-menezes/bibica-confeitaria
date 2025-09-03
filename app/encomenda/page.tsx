"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartSummary } from "@/components/cart-summary"
import { CheckoutForm } from "@/components/checkout-form"
import { Toaster } from "@/components/ui/toaster"
import { getCart, clearCart } from "@/lib/cart"

export default function EncomendaPage() {
  const [hasItems, setHasItems] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const cart = getCart()
    setHasItems(cart.length > 0)
  }, [])

  const handleOrderSubmit = () => {
    // Clear cart after successful order
    clearCart()
    // Redirect to home page after a delay
    setTimeout(() => {
      router.push("/")
    }, 2000)
  }

  const handleCartUpdate = () => {
    const cart = getCart()
    setHasItems(cart.length > 0)
  }

  if (!hasItems) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container px-4 py-8">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h1 className="text-3xl md:text-4xl font-serif font-bold">Carrinho Vazio</h1>
            <p className="text-muted-foreground">Adicione alguns produtos ao carrinho para continuar.</p>
            <CartSummary onCartUpdate={handleCartUpdate} />
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-serif font-bold">Concluir Encomenda</h1>
            <p className="text-muted-foreground">Revise seu pedido e preencha seus dados para finalizar</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <CartSummary onCartUpdate={handleCartUpdate} />
            <CheckoutForm onOrderSubmit={handleOrderSubmit} />
          </div>

          <div className="bg-muted rounded-lg p-6 space-y-4">
            <h3 className="font-semibold text-lg">Políticas importantes:</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Prazos de produção:</h4>
                <p>Trufas e geladinhos: 24h</p>
                <p>Pudins inteiros: 48h</p>
                <p>Eventos grandes: 5 dias úteis</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Entrega e retirada:</h4>
                <p>Retirada gratuita</p>
                <p>Entrega local sob taxa</p>
                <p>(a combinar conforme bairro)</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Pagamento:</h4>
                <p>Pix (chave a informar)</p>
                <p>Cartão/dinheiro na entrega</p>
                <p>(consultar disponibilidade)</p>
              </div>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-medium text-foreground mb-2">Alergênicos:</h4>
              <p className="text-sm text-muted-foreground">
                Podem conter leite, ovos, castanhas e traços de glúten. Fale conosco para avaliar alternativas.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
