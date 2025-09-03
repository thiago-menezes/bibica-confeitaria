"use client"

import { useEffect, useState } from "react"
import { getCart, calculateDiscount } from "@/lib/cart"
import type { CartItem } from "@/lib/data"

export function DiscountBanner() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setCart(getCart())

    const handleStorageChange = () => {
      setCart(getCart())
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("cartUpdated", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("cartUpdated", handleStorageChange)
    }
  }, [])

  if (!isClient) {
    return null
  }

  const { eligibleQty, discount } = calculateDiscount(cart)

  if (discount > 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <p className="text-green-800 font-medium text-center">🎉 Desconto aplicado: 10% OFF nos itens elegíveis!</p>
      </div>
    )
  }

  if (eligibleQty > 0 && eligibleQty < 20) {
    const remaining = 20 - eligibleQty
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <p className="text-amber-800 font-medium text-center">
          Faltam {remaining} unidades para você ganhar 10% OFF nos itens elegíveis!
        </p>
      </div>
    )
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <p className="text-blue-800 font-medium text-center">
        A partir de 20 unidades, 10% de desconto no valor total dos itens elegíveis.
      </p>
      <p className="text-blue-600 text-sm text-center mt-1">
        (Desconto válido para trufas e geladinhos; pudins inteiros não entram no cálculo)
      </p>
    </div>
  )
}
