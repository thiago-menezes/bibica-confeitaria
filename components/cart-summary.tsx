"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Trash2, Edit3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCart, calculateDiscount, formatCurrency, clearCart, updateCartItemQty } from "@/lib/cart"
import type { CartItem } from "@/lib/data"

interface CartSummaryProps {
  onCartUpdate?: () => void
}

export function CartSummary({ onCartUpdate }: CartSummaryProps) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isClient, setIsClient] = useState(false)

  const refreshCart = () => {
    setCart(getCart())
    onCartUpdate?.()
  }

  useEffect(() => {
    setIsClient(true)
    refreshCart()

    const handleStorageChange = () => {
      refreshCart()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("cartUpdated", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("cartUpdated", handleStorageChange)
    }
  }, [])

  const handleQuantityChange = (productId: string, variantId: string | undefined, newQty: number) => {
    updateCartItemQty(productId, variantId, newQty)
    refreshCart()
  }

  const handleClearCart = () => {
    clearCart()
    refreshCart()
  }

  if (!isClient) {
    return <div>Carregando...</div>
  }

  if (cart.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground mb-4">Seu carrinho está vazio</p>
          <Button asChild>
            <Link href="/cardapio">Voltar ao cardápio</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  const { subtotal, discount, eligibleQty } = calculateDiscount(cart)
  const deliveryFee = 0 // To be calculated based on location
  const total = subtotal - discount + deliveryFee

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Resumo do Pedido <br/>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/cardapio">
                <Edit3 className="h-4 w-4 mr-1" />
                Editar itens
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleClearCart}>
              <Trash2 className="h-4 w-4 mr-1" />
              Esvaziar carrinho
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {cart.map((item) => (
            <div key={`${item.productId}-${item.variantId || "default"}`} className="flex justify-between items-center">
              <div className="flex-1">
                <p className="font-medium">
                  {item.name}
                  {item.variant && <span className="text-muted-foreground"> - {item.variant}</span>}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-muted-foreground">Qtd:</span>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(item.productId, item.variantId, item.qty - 1)}
                      disabled={item.qty <= 1}
                      className="h-6 w-6 p-0"
                    >
                      -
                    </Button>
                    <span className="w-8 text-center text-sm">{item.qty}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(item.productId, item.variantId, item.qty + 1)}
                      className="h-6 w-6 p-0"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(item.unitPrice)} × {item.qty}
                </p>
                <p className="font-medium">{formatCurrency(item.unitPrice * item.qty)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Desconto (10% OFF - {eligibleQty} itens elegíveis)</span>
              <span>-{formatCurrency(discount)}</span>
            </div>
          )}

          <div className="flex justify-between text-muted-foreground">
            <span>Taxa de entrega</span>
            <span>A calcular pelo bairro</span>
          </div>

          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
